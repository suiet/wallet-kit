import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WalletContext } from "../hooks";
import type {
  SignedTransaction,
  StandardConnectInput,
  SuiReportTransactionEffectsInput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionInput,
  SuiSignMessageInput,
  SuiSignPersonalMessageInput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionInput,
  WalletAccount,
} from "@mysten/wallet-standard";
import { Extendable } from "../types/utils";
import { isNonEmptyArray } from "../utils";
import { useAvailableWallets } from "../hooks/useAvailableWallets";
import { useAutoConnect } from "../hooks/useAutoConnect";
import { Storage } from "../utils/storage";
import { StorageKey } from "../constants/storage";
import { QueryClient, QueryClientProvider } from "react-query";
import { IdentifierString } from "@wallet-standard/core";
import getActiveChainFromConnectResult from "../utils/getActiveChainFromConnectResult";
import {
  AllDefaultWallets,
  Chain,
  ConnectionStatus,
  DefaultChains,
  FeatureName,
  IDefaultWallet,
  IWalletAdapter,
  KitError,
  UnknownChain,
  verifySignedMessage,
  WalletEvent,
  WalletEventListeners,
} from "@suiet/wallet-sdk";
import { SuiReportTransactionEffectsMethod } from "@mysten/wallet-standard/dist/esm";
import {
  ExecuteTransactionOptions,
  ExecuteTransactionResult,
} from "../types/params";
import { SuiClient } from "@mysten/sui/client";
import { toB64 } from "@mysten/sui/utils";
import { SuiClientContext } from "../contexts/SuiClientContext";

export type WalletProviderProps = Extendable & {
  defaultWallets?: IDefaultWallet[];
  chains?: Chain[];
  autoConnect?: boolean;
};

export const WalletProvider = (props: WalletProviderProps) => {
  const {
    defaultWallets = AllDefaultWallets,
    chains = DefaultChains,
    autoConnect = true,
    children,
  } = props;

  const { allAvailableWallets, configuredWallets, detectedWallets } =
    useAvailableWallets(defaultWallets);

  const [walletAdapter, setWalletAdapter] = useState<
    IWalletAdapter | undefined
  >();
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const [chain, setChain] = useState(() => {
    if (isNonEmptyArray(chains)) return chains[0]; // first one as default chain
    return UnknownChain;
  });
  // suiClient will automatically be updated when chain changes
  const suiClient = useMemo(
    () => new SuiClient({ url: chain.rpcUrl }),
    [chain]
  );

  const walletOffListeners = useRef<(() => void)[]>([]);

  const isCallable = (
    walletAdapter: IWalletAdapter | undefined,
    status: ConnectionStatus
  ) => {
    return walletAdapter && status === ConnectionStatus.CONNECTED;
  };

  const account = useMemo<WalletAccount | undefined>(() => {
    if (!isCallable(walletAdapter, status)) return;
    return (walletAdapter as IWalletAdapter).accounts[0]; // use first account by default
  }, [walletAdapter, status]);

  const ensureCallable = (
    walletAdapter: IWalletAdapter | undefined,
    status: ConnectionStatus
  ) => {
    if (!isCallable(walletAdapter, status)) {
      throw new KitError("Failed to call function, wallet not connected");
    }
  };

  const safelyGetWalletAndAccount = useCallback((): [
    IWalletAdapter,
    WalletAccount
  ] => {
    ensureCallable(walletAdapter, status);
    if (!account) {
      throw new KitError("no active account");
    }
    const _wallet = walletAdapter as IWalletAdapter;
    return [_wallet, account];
  }, [walletAdapter, account, status]);

  const connect = useCallback(
    async (adapter: IWalletAdapter, opts?: StandardConnectInput) => {
      if (!adapter) throw new KitError("param adapter is missing");

      setStatus(ConnectionStatus.CONNECTING);
      try {
        const res = await adapter.connect(opts);

        // try to get chain from the connected account
        if (isNonEmptyArray((res as any)?.accounts)) {
          const chainId = getActiveChainFromConnectResult(res);
          const targetChain = chains.find((item) => item.id === chainId);
          setChain(targetChain ?? UnknownChain);
        }

        setWalletAdapter(adapter);
        setStatus(ConnectionStatus.CONNECTED);

        const storage = new Storage();
        storage.setItem(StorageKey.LAST_CONNECT_WALLET_NAME, adapter.name);
        return res;
      } catch (e) {
        setWalletAdapter(undefined);
        setStatus(ConnectionStatus.DISCONNECTED);
        throw e;
      }
    },
    []
  );

  const disconnect = useCallback(async () => {
    ensureCallable(walletAdapter, status);
    const adapter = walletAdapter as IWalletAdapter;

    // try to clear listeners
    if (isNonEmptyArray(walletOffListeners.current)) {
      walletOffListeners.current.forEach((off) => {
        try {
          off();
        } catch (e) {
          console.error(
            "error when clearing wallet listener",
            (e as any).message
          );
        }
      });
      walletOffListeners.current = []; // empty array
    }

    // clear storage for last connected wallet
    // if users disconnect wallet manually
    const storage = new Storage();
    storage.removeItem(StorageKey.LAST_CONNECT_WALLET_NAME);

    try {
      // disconnect is an optional action for wallet
      if (adapter.hasFeature(FeatureName.STANDARD__DISCONNECT)) {
        await adapter.disconnect();
      }
    } finally {
      setWalletAdapter(undefined);
      setStatus(ConnectionStatus.DISCONNECTED);
      setChain(chains?.[0] ?? UnknownChain);
    }
  }, [walletAdapter, status]);

  const select = useCallback(
    async (walletName: string) => {
      // disconnect previous connection if it exists
      if (isCallable(walletAdapter, status)) {
        const adapter = walletAdapter as IWalletAdapter;
        // Same wallet, ignore
        if (walletName === adapter.name) return;

        // else first disconnect current wallet
        await disconnect();
      }

      const wallet = allAvailableWallets.find(
        (wallet) => wallet.name === walletName
      );
      if (!wallet) {
        const availableWalletNames = allAvailableWallets.map(
          (wallet) => wallet.name
        );
        throw new KitError(
          `select failed: wallet ${walletName} is not available, all wallets are listed here: [${availableWalletNames.join(
            ", "
          )}]`
        );
      }
      await connect(wallet.adapter as IWalletAdapter);
    },
    [walletAdapter, status, allAvailableWallets]
  );

  const on = useCallback(
    (event: WalletEvent, listener: WalletEventListeners[WalletEvent]) => {
      const [_wallet] = safelyGetWalletAndAccount();

      // filter event and params to decide when to emit
      const off = _wallet.on("change", (params) => {
        if (event === "change") {
          const _listener = listener as WalletEventListeners["change"];
          _listener(params);
          return;
        }
        if (params.chains && event === "chainChange") {
          const _listener = listener as WalletEventListeners["chainChange"];
          _listener({ chain: (params.chains as any)?.[0] });
          return;
        }
        if (params.accounts && event === "accountChange") {
          const _listener = listener as WalletEventListeners["accountChange"];
          _listener({ account: (params.accounts as any)?.[0] });
          return;
        }
        if (params.features && event === "featureChange") {
          const _listener = listener as WalletEventListeners["featureChange"];
          _listener({ features: params.features });
          return;
        }
      });
      walletOffListeners.current.push(off); // should help user manage off cleaners
      return off;
    },
    [safelyGetWalletAndAccount]
  );

  const getAccounts = useCallback(() => {
    const [_wallet] = safelyGetWalletAndAccount();
    return _wallet.accounts;
  }, [safelyGetWalletAndAccount]);

  const signAndExecuteTransactionBlock = useCallback(
    async (
      input: Omit<SuiSignAndExecuteTransactionBlockInput, "account" | "chain">
    ) => {
      const [_wallet, account] = safelyGetWalletAndAccount();
      return await _wallet.signAndExecuteTransactionBlock({
        account,
        chain: chain.id as IdentifierString,
        ...input,
      });
    },
    [safelyGetWalletAndAccount, chain]
  );

  const signTransaction = useCallback(
    async (input: Omit<SuiSignTransactionInput, "account" | "chain">) => {
      const [_wallet, account] = safelyGetWalletAndAccount();
      return await _wallet.signTransaction({
        account,
        chain: chain.id as IdentifierString,
        ...input,
      });
    },
    [safelyGetWalletAndAccount, chain]
  );

  const signAndExecuteTransaction = useCallback(
    async (
      input: Omit<SuiSignAndExecuteTransactionInput, "account" | "chain">,
      options?: ExecuteTransactionOptions
    ) => {
      const [_wallet, account] = safelyGetWalletAndAccount();

      const executeTransaction = async (
        signedTransaction: SignedTransaction
      ): Promise<ExecuteTransactionResult> => {
        if (typeof options?.execute === "function") {
          return await options.execute(signedTransaction);
        }
        const { digest, rawEffects } = await suiClient.executeTransactionBlock({
          transactionBlock: signedTransaction.bytes,
          signature: signedTransaction.signature,
          options: {
            showRawEffects: true,
          },
        });
        return {
          digest,
          rawEffects,
        };
      };

      const signedTransaction = await _wallet.signTransaction({
        transaction: input.transaction,
        account,
        chain: chain.id as IdentifierString,
      });
      const execResult = await executeTransaction(signedTransaction);

      let effects: string;

      if ("effects" in execResult && execResult.effects?.bcs) {
        effects = execResult.effects.bcs;
      } else if ("rawEffects" in execResult) {
        effects = toB64(new Uint8Array(execResult.rawEffects!));
      } else {
        throw new Error(
          "effects or rawEffects not found in the execution result"
        );
      }

      try {
        await _wallet.reportTransactionEffects({
          effects,
          account,
          chain: chain.id as IdentifierString,
        });
      } catch (error) {
        console.warn("Failed to report transaction effects:", error);
      }

      return {
        bytes: signedTransaction.bytes,
        signature: signedTransaction.signature,
        digest: execResult.digest,
        effects,
      };
    },
    [safelyGetWalletAndAccount, chain, suiClient]
  );

  const reportTransactionEffects = useCallback(
    async (
      input: Omit<SuiReportTransactionEffectsInput, "account" | "chain">
    ) => {
      const [_wallet, account] = safelyGetWalletAndAccount();
      return await _wallet.reportTransactionEffects({
        account,
        chain: chain.id as IdentifierString,
        ...input,
      });
    },
    [safelyGetWalletAndAccount, chain]
  );

  const signTransactionBlock = useCallback(
    async (input: Omit<SuiSignTransactionBlockInput, "account" | "chain">) => {
      const [_wallet, account] = safelyGetWalletAndAccount();
      return await _wallet.signTransactionBlock({
        account,
        chain: chain.id as IdentifierString,
        ...input,
      });
    },
    [safelyGetWalletAndAccount, chain]
  );

  const signMessage = useCallback(
    async (input: Omit<SuiSignMessageInput, "account">) => {
      const [_wallet, account] = safelyGetWalletAndAccount();
      return await _wallet.signMessage({
        account,
        message: input.message,
      });
    },
    [safelyGetWalletAndAccount]
  );

  const signPersonalMessage = useCallback(
    async (input: Omit<SuiSignPersonalMessageInput, "account">) => {
      const [_wallet, account] = safelyGetWalletAndAccount();
      return await _wallet.signPersonalMessage({
        account,
        message: input.message,
      });
    },
    [safelyGetWalletAndAccount]
  );

  useAutoConnect(select, status, allAvailableWallets, autoConnect);

  // sync kit's chain with wallet's active chain
  useEffect(() => {
    if (!walletAdapter || status !== "connected") return;
    const off = on("chainChange", (params: { chain: string }) => {
      if (params.chain === chain.id) return;
      const newChain = chains.find((item) => item.id === params.chain);
      if (!newChain) {
        setChain(UnknownChain);
        return;
      }
      setChain(newChain);
    });
    return () => {
      off();
    };
  }, [walletAdapter, status, chain, chains, on]);

  return (
    <WalletContext.Provider
      value={{
        name: walletAdapter?.name,
        chains,
        chain,
        allAvailableWallets,
        configuredWallets,
        detectedWallets,
        adapter: walletAdapter,
        status,
        connecting: status === ConnectionStatus.CONNECTING,
        connected: status === ConnectionStatus.CONNECTED,
        select,
        disconnect,
        on,
        getAccounts,
        account,
        signPersonalMessage,
        signTransaction,
        signAndExecuteTransaction,
        reportTransactionEffects,
        signMessage,
        signTransactionBlock,
        signAndExecuteTransactionBlock,
        verifySignedMessage,
        address: account?.address,
      }}
    >
      <QueryClientProvider client={new QueryClient()}>
        <SuiClientContext.Provider value={suiClient}>
          {children}
        </SuiClientContext.Provider>
      </QueryClientProvider>
    </WalletContext.Provider>
  );
};
