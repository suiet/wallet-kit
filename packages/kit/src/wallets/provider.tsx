import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import type {
  SuiAddress,
  MoveCallTransaction,
  SuiTransactionResponse,
  SignableTransaction,
} from '@mysten/sui.js';
import { WalletContext } from '../hooks/useWallet';
import latestWallets from './latestWallets';
import {
  SignMessageInput,
  Wallet,
  WalletInstance,
  WalletList,
} from '../adapter/KitAdapter';
import { keyBy, groupBy } from 'lodash';
import { AccountStatus } from '../types/account';
import { useAdapters } from '../hooks/useAdapters';
import { WalletContainer } from '../standard/WalletsContainer';

interface WalletProviderProps {
  children: ReactNode;
  supportedWallets: WalletInstance[];
}

const LAST_WALLET = 'SUIET_LAST_WALLET';

export function WalletProvider({
  supportedWallets,
  children,
}: WalletProviderProps) {
  const [wallet, setWallet] = useState<WalletInstance | null>(null);
  const [status, setStatus] = useState(AccountStatus.disconnected);
  const [address, setAddress] = useState('');
  const adapters = useAdapters([new WalletContainer()]);

  useEffect(() => {
    if (wallet && status === AccountStatus.connected) {
      wallet?.adapter.getAccounts().then((accounts) => {
        const address = accounts[0];
        setAddress(address);
      });
    }
  }, [status, wallet]);

  const walletInstanceByName = keyBy(
    supportedWallets,
    (walletInstance) => walletInstance.name
  );

  adapters.forEach((adapter) => {
    const wi = walletInstanceByName[adapter.name];
    if (wi) {
      wi.installed = true;
      wi.adapter = adapter;
    }
  });

  const groupWallets = groupBy(supportedWallets, (wallet) => wallet.group);

  const recentWalletsNames = latestWallets
    .getLatestWalletNames()
    .filter((name) => {
      return walletInstanceByName[name];
    })
    .slice(0, 3);

  const recentWallets = recentWalletsNames.map((name) => {
    return walletInstanceByName[name];
  });

  groupWallets['Recent'] = recentWallets;

  const connect = useCallback(async (wallet: WalletInstance) => {
    try {
      setStatus(AccountStatus.connecting);
      const res = await wallet.adapter.connect();
      setStatus(AccountStatus.connected);
    } catch (e) {
      setStatus(AccountStatus.disconnected);
      throw new Error('Connect Failed');
    }
  }, []);

  const disconnect = async () => {
    try {
      if (!wallet) throw new Error('No wallet to disconnect');
      await wallet?.adapter.disconnect();
      setWalletAndUpdateStorage(null);
      setStatus(AccountStatus.disconnected);
    } catch (e) {
      throw e;
    }
  };

  const setWalletAndUpdateStorage = useCallback(
    (selectedWallet: WalletInstance | null) => {
      setWallet(selectedWallet);
      if (selectedWallet !== null) {
        latestWallets.storeWalletName(selectedWallet.name);
      } else {
        localStorage.removeItem(LAST_WALLET);
      }
    },
    []
  );

  const choose = useCallback(
    (name: string) => {
      let newWallet = supportedWallets.find((wallet) => wallet.name === name);
      if (newWallet) {
        setWalletAndUpdateStorage(newWallet);
        localStorage.setItem(LAST_WALLET, newWallet.name);
      } else {
        localStorage.removeItem(LAST_WALLET);
        throw new Error('Error wallet');
      }
      connect(newWallet);
    },

    [supportedWallets, connect, setWalletAndUpdateStorage]
  );

  const getAccounts = async (): Promise<SuiAddress[]> => {
    if (wallet === null) throw Error('Wallet Not Connected');
    return await wallet.adapter.getAccounts();
  };

  const executeMoveCall = async (
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> => {
    if (wallet === null) throw Error('Wallet Not Connected');
    return await wallet.adapter.executeMoveCall(transaction);
  };

  const executeSerializedMoveCall = async (
    transactionBytes: Uint8Array
  ): Promise<SuiTransactionResponse> => {
    if (wallet === null) throw Error('Wallet Not Connected');
    return await wallet.adapter.executeSerializedMoveCall(transactionBytes);
  };

  const signMessage = async (input: SignMessageInput) => {
    if (typeof wallet?.adapter.signMessage === 'function') {
      const data = await wallet.adapter.signMessage(input);
      return data;
    } else {
      throw new Error('Not support signMessage method');
    }
  };

  const signAndExecuteTransaction = async (
    transaction: SignableTransaction
  ) => {
    if (typeof wallet?.adapter.signAndExecuteTransaction === 'function') {
      return await wallet?.adapter.signAndExecuteTransaction(transaction);
    } else {
      throw new Error('Not support signAndExecuteTransaction method');
    }
  };

  return (
    <WalletContext.Provider
      value={{
        supportedWallets,
        wallet,
        connecting: status === AccountStatus.connecting,
        connected: status === AccountStatus.connected,
        select: choose,
        connect,
        disconnect,
        getAccounts,
        executeMoveCall,
        executeSerializedMoveCall,
        groupWallets,
        address,
        status,
        signMessage,
        signAndExecuteTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
