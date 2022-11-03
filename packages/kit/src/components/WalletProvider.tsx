import React, {useCallback, useEffect, useMemo, useState} from "react";
import {WalletContext} from "../hooks/useWalletTemp";
import {
  ConnectionStatus,
  IWalletAdapter,
  IDefaultWallet,
} from "../types/wallet";
import {
  ConnectInput,
  SuiSignAndExecuteTransactionInput,
  WalletAccount,
} from "@mysten/wallet-standard";
import {KitError, WalletError} from "../errors";
import {AllDefaultWallets} from "../wallet/default-wallets";
import {useWalletAdapterDetection} from "../wallet-standard/use-wallet-detection";
import {Extendable} from "../types";

export type WalletProviderProps = Extendable & {
  defaultWallets?: IDefaultWallet[];
};

const useAvailableWallets = (defaultWallets: IDefaultWallet[]) => {
  const {availableWalletAdapters} = useWalletAdapterDetection()
  const [popularWallets, setPopularWallets] = useState<IWalletAdapter[]>(
    []
  );
  const [moreWallets, setMoreWallets] = useState<IWalletAdapter[]>(
    []
  );
  const popularWalletNameOrders = useMemo(() => defaultWallets.map(i => i.name), [defaultWallets])

  useEffect(() => {
    // detect logic

  }, []);

  return {
    popular: popularWallets,
    more: moreWallets,
  };
};

export const WalletProvider = (props: WalletProviderProps) => {
  const {defaultWallets = AllDefaultWallets, children} = props;
  const {popular: popularWallets, more: moreWallets} = useAvailableWallets(defaultWallets);

  const [wallet, setWallet] = useState<IWalletAdapter | undefined>();
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );

  const isCallable = (
    wallet: IWalletAdapter | undefined,
    status: ConnectionStatus
  ) => {
    return wallet && status === ConnectionStatus.CONNECTED;
  };

  const account = useMemo<WalletAccount | undefined>(() => {
    if (!isCallable(wallet, status)) return;
    return (wallet as IWalletAdapter).accounts[0]; // use first account by default
  }, [wallet, status]);


  const ensureCallable = (
    wallet: IWalletAdapter | undefined,
    status: ConnectionStatus
  ) => {
    if (!isCallable(wallet, status)) {
      throw new KitError("Failed to call function, wallet not connected");
    }
  };

  const connect = useCallback(
    async (adapter: IWalletAdapter, opts?: ConnectInput) => {
      if (!adapter) throw new KitError("param adapter is missing");

      setStatus(ConnectionStatus.CONNECTING);
      try {
        const res = await adapter.connect(opts);
        setWallet(adapter);
        setStatus(ConnectionStatus.CONNECTED);
        return res;
      } catch (e) {
        setWallet(undefined);
        setStatus(ConnectionStatus.DISCONNECTED);
        throw e;
      }
    },
    []
  );

  const disconnect = useCallback(async () => {
    ensureCallable(wallet, status);
    const _wallet = wallet as IWalletAdapter;
    try {
      await _wallet.disconnect();
    } finally {
      setWallet(undefined);
      setStatus(ConnectionStatus.DISCONNECTED);
    }
  }, [wallet, status]);

  const getAccounts = useCallback(() => {
    ensureCallable(wallet, status);
    const _wallet = wallet as IWalletAdapter;
    return _wallet.accounts;
  }, [wallet, status]);

  const signAndExecuteTransaction = useCallback(
    async (transaction: SuiSignAndExecuteTransactionInput) => {
      ensureCallable(wallet, status);
      const _wallet = wallet as IWalletAdapter;
      return await _wallet.signAndExecuteTransaction(transaction);
    },
    [wallet, status]
  );

  const signMessage = useCallback(
    async (message: Uint8Array) => {
      ensureCallable(wallet, status);
      if (!account) {
        throw new KitError("no active account");
      }

      const _wallet = wallet as IWalletAdapter;
      return await _wallet.signMessage({
        account,
        message,
      });
    },
    [wallet, account, status]
  );

  return (
    <WalletContext.Provider
      value={{
        wallet,
        status,
        connecting: status === ConnectionStatus.CONNECTING,
        connected: status === ConnectionStatus.CONNECTED,
        // FIXME
        select: () => {
        },
        connect,
        disconnect,
        getAccounts,
        account,
        signAndExecuteTransaction,
        signMessage,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};