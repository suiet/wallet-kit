import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import type {
  SuiAddress,
  MoveCallTransaction,
  SuiTransactionResponse,
} from '@mysten/sui.js';
import { WalletContext } from '../hooks/useWallet';
import latestWallets from './latestWallets';
import { Wallet, WalletInstance, WalletList } from '../adapter/KitAdapter';
import { keyBy, groupBy } from 'lodash';

interface WalletProviderProps {
  children: ReactNode;
  supportedWallets: WalletInstance[];
  autoConnect?: boolean;
}

const LAST_WALLET = 'SUIET_LAST_WALLET';

export function WalletProvider({
  supportedWallets,
  children,
  autoConnect = true,
}: WalletProviderProps) {
  const [wallet, setWallet] = useState<WalletInstance | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const walletInstanceByName = keyBy(
    supportedWallets,
    (walletInstance) => walletInstance.name
  );

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

  const connect = useCallback(async () => {
    if (wallet == null) {
      return;
    }
    try {
      setConnecting(true);
      await wallet.adapter.connect();
      setConnected(true);
    } catch (e) {
      console.error(e);
      setConnected(false);
      throw new Error('Connect Failed');
    }
    setConnecting(false);
  }, [wallet]);

  const disconnect = async () => {
    setConnected(false);
    setWalletAndUpdateStorage(null);
  };

  const setWalletAndUpdateStorage = useCallback(
    (selectedWallet: WalletInstance | null) => {
      setWallet(selectedWallet);
      if (selectedWallet != null) {
        latestWallets.storeWalletName(selectedWallet.adapter.name);
      } else {
      }
    },
    []
  );

  const choose = useCallback(
    (name: string) => {
      let newWallet = supportedWallets.find(
        (wallet) => wallet.adapter.name === name
      );
      if (newWallet) {
        setWalletAndUpdateStorage(newWallet);
        localStorage.setItem(LAST_WALLET, newWallet.adapter.name);
      } else {
        localStorage.removeItem(LAST_WALLET);
        throw new Error('Error wallet');
      }
      connect();
    },
    [supportedWallets, connect, setWalletAndUpdateStorage]
  );

  useEffect(() => {
    if (!wallet && !connected && !connecting && autoConnect) {
      let walletItem = localStorage.getItem(LAST_WALLET);
      if (typeof walletItem === 'string') {
        const items = walletItem;
        choose(items);
      }
    }
  }, [choose, connected, connecting, wallet]);

  const getAccounts = async (): Promise<SuiAddress[]> => {
    if (wallet == null) throw Error('Wallet Not Connected');
    return await wallet.adapter.getAccounts();
  };

  const executeMoveCall = async (
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> => {
    if (wallet == null) throw Error('Wallet Not Connected');
    return await wallet.adapter.executeMoveCall(transaction);
  };

  const executeSerializedMoveCall = async (
    transactionBytes: Uint8Array
  ): Promise<SuiTransactionResponse> => {
    if (wallet == null) throw Error('Wallet Not Connected');
    return await wallet.adapter.executeSerializedMoveCall(transactionBytes);
  };

  useEffect(() => {
    if (wallet != null && connecting !== true && connected !== true) {
      connect();
    }
  }, [connect, wallet, connecting, connected]);

  return (
    <WalletContext.Provider
      value={{
        supportedWallets,
        wallet,
        connecting: connecting,
        connected: connected,
        select: choose,
        connect,
        disconnect,
        getAccounts,
        executeMoveCall,
        executeSerializedMoveCall,
        groupWallets,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
