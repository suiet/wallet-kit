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
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (connected) {
      wallet?.adapter.getAccounts().then((accounts) => {
        const address = accounts[0];
        setAddress(address);
      });
    }
  }, [connected]);

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
    if (wallet === null) {
      return;
    }
    try {
      setConnecting(true);
      const res = await wallet.adapter.connect();
      setConnected(true);
    } catch (e) {
      setConnected(false);
      throw new Error('Connect Failed');
    }
    setConnecting(false);
  }, [wallet]);

  const disconnect = async () => {
    try {
      if (!wallet) throw new Error('No wallet to disconnect');
      await wallet?.adapter.disconnect();
      setWalletAndUpdateStorage(null);
      setConnected(false);
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
      connect();
    },
    [supportedWallets, connect, setWalletAndUpdateStorage]
  );

  useEffect(() => {
    if (!wallet && !connected && !connecting && autoConnect) {
      let walletItem = localStorage.getItem(LAST_WALLET);
      if (typeof walletItem === 'string') {
        const items = walletItem;
        setTimeout(() => {
          choose(items);
        }, 200);
      }
    }
  }, [choose, connected, connecting, wallet]);

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

  // auto reconnect
  useEffect(() => {
    if (wallet !== null && connecting !== true && connected !== true) {
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
        address,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
