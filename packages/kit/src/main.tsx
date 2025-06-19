import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { ConnectButton, WalletProvider } from "./components";
import {
  useAccountBalance,
  useChain,
  useSuiClient,
  useSuiProvider,
  useWallet,
  useSuinsName,
} from "./hooks";
import {
  ErrorCode,
  SuiChainId,
  formatSUI,
  defineSlushWallet,
  Uint8arrayTool,
} from "@suiet/wallet-sdk";
import { AllDefaultWallets, BrowserEnvDetector } from "@suiet/wallet-sdk";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519PublicKey } from '@mysten/sui/keypairs/ed25519';
import { QueryClient, QueryClientProvider } from "react-query";

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


function createMintNftTxb(contractAddress: string) {
  const tx = new Transaction();
  tx.moveCall({
    target: contractAddress,
    arguments: [
      tx.pure.string("Suiet NFT"),
      tx.pure.string("Suiet Sample NFT"),
      tx.pure.string(
        "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
      ),
    ],
  });
  return tx;
}


function App() {
  const wallet = useWallet();
  const { balance } = useAccountBalance();
  const chain = useChain();
  const client = useSuiClient();

  console.log('wallet: ', wallet)
  console.log('chain: ', chain)
  console.log('account address: ', wallet.account?.address)
  console.log('account SuinsName: ', wallet.account?.suinsName)

  const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return sampleNft.get(wallet.chain.id) ?? "";
  }, [wallet]);

  async function handleSignAndExecuteTransactionBlock(
    target: string | undefined
  ) {
    if (!target) return;
    try {
      const tx = createMintNftTxb(target);
      const resData = await wallet.signAndExecuteTransactionBlock({
        // @ts-ignore
        transactionBlock: tx,
        options: {
          showObjectChanges: true,
        },
      });
      console.log("executeMoveCall success", resData);
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  }

  async function handleSignAndExecuteTransaction(
    target: string | undefined,
    opts?: {
      isCustomExecution?: boolean;
    }
  ) {
    if (!target) return;
    try {
      const tx = createMintNftTxb(target);

      if (!opts?.isCustomExecution) {
        const resData = await wallet.signAndExecuteTransaction({
          transaction: tx,
        });
        console.log("signAndExecuteTransaction success", resData);
      } else {
        const resData = await wallet.signAndExecuteTransaction(
          {
            transaction: tx,
          },
          {
            execute: async ({ bytes, signature }) => {
              const res = await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature: signature,
                options: {
                  showRawEffects: true,
                  showObjectChanges: true,
                },
              });
              return res;
            },
          }
        );
        console.log("signAndExecuteTransaction success", resData);
      }

      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  }

  async function handleSignPersonalMessage() {
    if (!wallet.account) return;

    try {
      const msg = "Hello world!";
      const msgBytes = new TextEncoder().encode(msg);
      // Convert ReadonlyUint8Array to Uint8Array
      const msgUint8Array = new Uint8Array(msgBytes);
      
      const result = await wallet.signPersonalMessage({
        message: msgUint8Array,
      });
      const isValid = await wallet.verifySignedPersonalMessage(result);
      console.log("verify signedMessage", isValid);
      if (!isValid) {
        alert("signMessage succeeded but signature verification failed");
      } else {
        alert("signMessage succeeded and signature verification passed");
      }
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed: " + e);
    }
  }

  function getPublicKey() {
    // @ts-ignore
    return wallet.account?.publicKey?.toString("hex");
  }

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

  const handleSignTxnAndVerifySignature = async (contractAddress: string) => {
    const txn = createMintNftTxb(contractAddress);
    txn.setSender(wallet.account?.address as string);
    let signedTxn;
    try {
      signedTxn = await wallet.signTransaction({
        transaction: txn,
      });
    } catch (e) {
      console.error("signTransaction failed", e);
      alert("signTransaction failed: " + e);
      return;
    }
    console.log(`Sign and verify txn:`)
    try {
      const isValid = await wallet.verifySignedTransaction(signedTxn);
      console.log("verifySignedTransaction: ", isValid);
      if (!isValid) {
        alert("signTransaction succeeded but signature verification failed");
      } else {
        alert("signTransaction succeeded and signature verification passed");
      }
    } catch (e) {
      console.error("verifySignedTransaction failed", e);
      alert("verifySignedTransaction failed: " + e);
    }
  }

  const handleDetectEnvironment = () => {
    const envInfo = BrowserEnvDetector.detectEnvironment();
    const adapterId = wallet.adapter?.id;
    const adapterName = wallet.adapter?.name;
    alert(
      `Browser Environment:\n` +
      `- Is Browser: ${envInfo.isBrowser}\n` +
      `- Is Mobile Browser: ${envInfo.isMobileBrowser}\n` +
      `- Adapter ID: ${adapterId}\n` +
      `- Adapter Name: ${adapterName}\n`
    );
    console.log("Environment detection results:", envInfo);
  };


  const handleSwitchAccount = async (address: string) => {
    const newAccount = await wallet.switchAccount(address);
    console.log("switch account to: ", newAccount);
  }

  const renderWalletAccounts = () => {
    if (!wallet.connected) return null;
    const accounts = wallet.getAccounts();
    if (!accounts?.length) return null;
    return <ol>
      {accounts.map((account) => {
        return <li key={account.address} onClick={() => handleSwitchAccount(account.address)}
          style={{ cursor: "pointer" }}
        >
          <p>address: {account.address}</p>
          <p>label: {account.label ?? "no label"}</p>
          <p>publicKey: {account.publicKey ?? "not supported"}</p>
        </li>
      })}
    </ol>;
  }

  // @ts-ignore
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConnectButton
        className={"aaa"}
        style={{ marginTop: "16px" }}
        onConnectSuccess={(name) => {
          console.log("connect success: ", name);
        }}
        onConnectError={(err) => {
          if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
            console.warn(
              "user rejected the connection to " + err.details?.wallet
            );
          } else {
            console.warn("unknown connect error: ", err);
          }
        }}
        onDisconnectSuccess={(name) => {
          console.log("disconnect success: ", name);
        }}
        onDisconnectError={(err) => {
          console.log("disconnect error: ", err);
        }}
      />

      {!wallet.connected ? (
        <div>
          <p>Connect DApp with Suiet wallet from now!</p>
          <button onClick={handleDetectEnvironment} style={{ marginTop: "16px" }}>
            Detect Browser Environment
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p>current wallet: {wallet.adapter?.name}</p>
            <p>
              wallet status:{" "}
              {wallet.connecting
                ? "connecting"
                : wallet.connected
                ? "connected"
                : "disconnected"}
            </p>
            <p>account address: {wallet.account?.address}</p>
            <p>account suinsName: {wallet.account?.suinsName}</p>
            <p>account label: {wallet.account?.label || "no label provided"}</p>
            <p>account publicKey: {getPublicKey() || "not supported"}</p>
            <br />
            <p>Available Accounts:</p>
            {renderWalletAccounts()}
            <p>
              current chain: {wallet.chain?.name} (id: {wallet.chain?.id})
            </p>
            <p>
              SUI Balance: {formatSUI(balance ?? 0)} (id: {wallet.chain?.id})
            </p>
            <br />
          </div>
          <div style={{ margin: "8px 0", display: "flex", gap: "8px" }}>
            {nftContractAddr && (
              <button
                onClick={() =>
                  handleSignAndExecuteTransactionBlock(nftContractAddr)
                }
              >
                Mint {chainName(wallet.chain?.id)} NFT
              </button>
            )}
            {nftContractAddr && (
              <button
                onClick={() =>
                  handleSignAndExecuteTransaction(nftContractAddr, {
                    isCustomExecution: true,
                  })
                }
              >
                Sign + Execute Transaction
              </button>
            )}
            <button onClick={handleSignPersonalMessage}>signMessage</button>
          </div>
          <div style={{ margin: "8px 0", display: "flex", gap: "8px" }}>
            {nftContractAddr && (
              <button
                onClick={() =>
                  handleSignAndExecuteTransactionBlock(nftContractAddr)
                }
              >
                Mint {chainName(wallet.chain?.id)} NFT
              </button>
            )}
            <button onClick={handleSignPersonalMessage}>signMessage</button>
            {nftContractAddr && (
              <button
                onClick={() =>
                  handleSignTxnAndVerifySignature(nftContractAddr)
                }
              >
                Sign Transaction + Verify Signature
              </button>
            )}
            <button onClick={handleDetectEnvironment}>
              Detect Browser Environment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const queryClient = new QueryClient();

const slushWallet = defineSlushWallet({
  appName: "Suiet Wallet Kit",
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WalletProvider
        defaultWallets={[...AllDefaultWallets, slushWallet]}
        useLegacyDisconnectDropdown={false}
        enableSuiNS={true}
      >
        <App />
      </WalletProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
