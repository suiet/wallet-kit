"use client"; // In Next.js, this is required to prevent the component from being rendered on the server.

import Image from "next/image";
import {
  addressEllipsis,
  ConnectButton,
  ErrorCode,
  formatSUI,
  SuiChainId,
  useAccountBalance,
  useChain,
  useSuiClient,
  useWallet,
} from "@suiet/wallet-kit";
import { useMemo } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { SuiSignAndExecuteTransactionOutput } from "@mysten/wallet-standard";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { Buffer } from "buffer";

const sampleNft = new Map([
  [
    "sui:devnet",
    "0xe146dbd6d33d7227700328a9421c58ed34546f998acdc42a1d05b4818b49faa2::nft::mint",
  ],
  [
    "sui:testnet",
    "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
  ],
  [
    "sui:mainnet",
    "0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::nft::mint",
  ],
]);

export default function Home() {
  const wallet = useWallet();
  const suiClient = useSuiClient();

  const { balance } = useAccountBalance();
  const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return sampleNft.get(wallet.chain.id) ?? "";
  }, [wallet]);
  const chain = useChain(SuiChainId.MAIN_NET);

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return "";
    // @ts-ignore
    return value.toString("hex");
  }

  async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure.string("Suiet NFT"),
          tx.pure.string("Suiet Sample NFT"),
          tx.pure.string(
            "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
          ),
        ],
      });
      // const resData = await wallet.signAndExecuteTransactionBlock({
      //   transactionBlock: tx,
      //   options: {
      //     showObjectChanges: true,
      //   },
      // });

      const resData = await wallet.signAndExecuteTransaction<
        SuiSignAndExecuteTransactionOutput & SuiTransactionBlockResponse
      >(
        {
          transaction: tx,
        },
        {
          execute: ({ bytes, signature }) => {
            return suiClient.executeTransactionBlock({
              transactionBlock: bytes,
              signature,
              options: {
                showRawEffects: true,
                showObjectChanges: true,
              },
            });
          },
        }
      );
      console.log("executeMoveCall success", resData);
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  }

  async function handleSignMsg() {
    if (!wallet.account) return;
    try {
      const msg = "Hello world!";
      const msgBytes = new TextEncoder().encode(msg);
      const result = await wallet.signPersonalMessage({
        message: msgBytes,
      });
      const verifyResult = await wallet.verifySignedPersonalMessage(result);
      console.log("verify signedMessage", verifyResult);
      if (!verifyResult) {
        alert(`signMessage succeed, but verify signedMessage failed`);
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`);
      }
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed (see response in the console)");
    }
  }

  const handleSignTxnAndVerifySignature = async (contractAddress: string) => {
    const txn = new Transaction();
    txn.moveCall({
      target: contractAddress as any,
      arguments: [
        txn.pure.string("Suiet NFT"),
        txn.pure.string("Suiet Sample NFT"),
        txn.pure.string(
          "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
        ),
      ],
    });
    txn.setSender(wallet.account?.address as string);

    try {
      const signedTxn = await wallet.signTransaction({
        transaction: txn,
      });

      console.log(`Sign and verify txn:`);
      console.log("--wallet: ", wallet.adapter?.name);
      console.log("--account: ", wallet.account?.address);
      const publicKey = wallet.account?.publicKey;
      if (!publicKey) {
        console.error("no public key provided by wallet");
        return;
      }
      console.log("-- publicKey: ", publicKey);
      const pubKey = new Ed25519PublicKey(publicKey);
      console.log("-- signed txnBytes: ", signedTxn.bytes);
      console.log("-- signed signature: ", signedTxn.signature);
      const txnBytes = new Uint8Array(Buffer.from(signedTxn.bytes, "base64"));
      const isValid = await pubKey.verifyTransaction(txnBytes, signedTxn.signature);
      console.log("-- use pubKey to verify transaction: ", isValid);
      if (!isValid) {
        alert(`signTransaction succeed, but verify transaction failed`);
      } else {
        alert(`signTransaction succeed, and verify transaction succeed!`);
      }
    } catch (e) {
      console.error("signTransaction failed", e);
      alert("signTransaction failed (see response in the console)");
    }
  };

  const chainName = (chainId: string | undefined) => {
    switch (chainId) {
      case SuiChainId.MAIN_NET:
        return "Mainnet";
      case SuiChainId.TEST_NET:
        return "Testnet";
      case SuiChainId.DEV_NET:
        return "Devnet";
      default:
        return "Unknown";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="logo relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mb-8"
          src="/suiet-logo.svg"
          alt="Suiet Logo"
          width={180}
          height={37}
          priority
          onClick={() => {
            window.open("https://github.com/suiet/wallet-kit", "_blank");
          }}
        />

        <ConnectButton
          onConnectError={(error) => {
            if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
              console.warn(
                "user rejected the connection to " + error.details?.wallet
              );
            } else {
              console.warn("unknown connect error: ", error);
            }
          }}
        />

        {!wallet.connected ? (
          <p className={"my-8"}>Connect DApp with Suiet wallet from now!</p>
        ) : (
          <div className={"my-8"}>
            <div>
              <p>current wallet: {wallet.adapter?.name}</p>
              <p>
                wallet status:{" "}
                {wallet.connecting
                  ? "connecting"
                  : wallet.connected
                  ? "connected"
                  : "disconnected"}
              </p>
              <p>
                account address: {addressEllipsis(wallet.account?.address ?? "")}
              </p>
              <p>account label: {wallet.account?.label || "no label provided"}</p>
              <p>current network: {wallet.chain?.name}</p>
              <p>
                wallet balance:{" "}
                {formatSUI(balance ?? 0, {
                  withAbbr: false,
                })}{" "}
                SUI
              </p>
            </div>
            <div className={"flex flex-col my-8"}>
              {nftContractAddr && (
                <button onClick={() => handleExecuteMoveCall(nftContractAddr)}>
                  Mint {chainName(wallet.chain?.id)} NFT
                </button>
              )}
              <button className={"mt-4"} onClick={handleSignMsg}>
                signMessage
              </button>
              {nftContractAddr && (
                <button className={"mt-4"} onClick={() => handleSignTxnAndVerifySignature(nftContractAddr)}>
                  Sign & Verify Transaction
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div></div>
    </main>
  );
}
