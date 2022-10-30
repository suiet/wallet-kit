import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
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
import { isStandardAdapter } from '../utils/isStandardAdapter';
import {
  ActionType,
  initialWalletState,
  walletReducer,
  WalletState,
} from './reducer';

interface WalletProviderProps {
  children: ReactNode;
  supportedWallets: WalletInstance[];
}

const LAST_WALLET = 'SUIET_LAST_WALLET';

async function commonCallAdapterFunc(
  wallet: WalletInstance,
  funcName: any,
  connect: Function,
  ...params: any[]
) {
  // @ts-ignore-nextlint
  if (typeof wallet?.adapter?.[funcName] === 'function') {
    try {
      // @ts-ignore-nextlint
      return await wallet?.adapter[funcName](...params);
    } catch (e) {
      if (e instanceof Error && e?.message.includes('permission')) {
        await connect();
        // @ts-ignore-nextlint
        return await wallet?.adapter[funcName](...params);
      }
      throw e;
    }

    // @ts-ignore-nextlint
  }
  // else if (typeof wallet?._adapter?.[funcName] === 'function') {
  //   // @ts-ignore-nextlint
  //   return await wallet?._adapter[funcName](...params);
  // }
  else {
    throw new Error(`Not support ${funcName} method`);
  }
}

let init = false;

export function WalletProvider({
  supportedWallets,
  children,
}: WalletProviderProps) {
  const adapters = useAdapters(new WalletContainer());
  const [{ wallet, status, address }, dispatch] = useReducer(
    walletReducer,
    initialWalletState
  );

  const setWalletStatus = (payload: Partial<WalletState>) => {
    dispatch({
      type: ActionType.Update,
      payload,
    });
  };

  useEffect(() => {
    if (wallet && status === AccountStatus.connected) {
      wallet?.adapter?.getAccounts().then((accounts) => {
        const address = accounts[0];
        setWalletStatus({
          address,
        });
      });
    }
  }, [status, wallet]);

  const walletInstanceByName = keyBy(
    supportedWallets,
    (walletInstance) => walletInstance.name
  );

  adapters.forEach((adapter) => {
    const wi = walletInstanceByName[adapter.name];
    if (wi && !init) {
      wi.installed = true;
      wi.adapter = adapter;
      return;
    }
    if (!init) {
      const walletInstance: WalletInstance = {
        adapter,
        name: adapter.name,
        index: -1,
        installed: true,
        iconUrl: adapter.icon || '',
        group: 'Popular',
      };
      walletInstanceByName[adapter.name] = walletInstance;
      supportedWallets.push(walletInstance);
    }
  });

  init = true;

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
      setWalletStatus({
        status: AccountStatus.connecting,
      });
      const res = await wallet?.adapter?.connect();
      setWalletStatus({
        status: AccountStatus.connected,
      });
    } catch (e) {
      setWalletStatus({
        status: AccountStatus.disconnected,
      });
      throw new Error('Connect Failed');
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (!wallet) throw new Error('No wallet to disconnect');
      await wallet?.adapter?.disconnect();
      setWalletAndUpdateStorage(wallet);
      setWalletStatus({
        status: AccountStatus.disconnected,
        wallet: null,
      });
    } catch (e) {
      throw e;
    }
  }, [wallet]);

  const reConnect = async () => {
    if (wallet === null) return;
    try {
      await disconnect();
    } catch {}
    try {
      await connect(wallet);
      wallet?.adapter?.getAccounts().then((accounts) => {
        const address = accounts[0];
        setWalletStatus({
          address,
        });
      });
    } catch (e) {
      throw e;
    }
  };

  const setWalletAndUpdateStorage = useCallback(
    (selectedWallet: WalletInstance | null) => {
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
        setWalletStatus({
          wallet: newWallet,
        });
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

  const getAccounts = useCallback(async (): Promise<SuiAddress[]> => {
    if (wallet === null) throw Error('Wallet Not Connected');
    return await commonCallAdapterFunc(wallet, 'getAccounts', reConnect);
  }, [wallet]);

  // const executeMoveCall = async (
  //   transaction: MoveCallTransaction
  // ): Promise<SuiTransactionResponse> => {
  //   if (wallet === null) throw Error('Wallet Not Connected');
  //   if (typeof wallet?._adapter?.executeMoveCall === 'function')
  //     return await wallet._adapter.executeMoveCall(transaction);
  //   throw new Error(`Not support executeMoveCall method`);
  // };

  // const executeSerializedMoveCall = async (
  //   transactionBytes: Uint8Array
  // ): Promise<SuiTransactionResponse> => {
  //   if (wallet === null) throw Error('Wallet Not Connected');
  //   if (typeof wallet?._adapter?.executeSerializedMoveCall === 'function')
  //     return await wallet._adapter.executeSerializedMoveCall(transactionBytes);
  //   throw new Error(`Not support executeMoveCall method`);
  // };

  const signMessage = async (input: SignMessageInput) => {
    if (wallet === null) throw Error('Wallet Not Connected');
    return await commonCallAdapterFunc(wallet, 'signMessage', reConnect, input);
  };

  const getPublicKey = async (): Promise<string> => {
    if (wallet === null) throw Error('Wallet Not Connected');
    if (isStandardAdapter(wallet.adapter)) {
      const publicKey = wallet.adapter.publicKey;
      const key = publicKey.find((k) => {
        return typeof k[address] === 'string';
      });
      if (key) return key[address];
      return '';
    }
    // else if (typeof wallet?._adapter?.getPublicKey === 'function') {
    //   return await wallet._adapter.getPublicKey();
    // }
    throw new Error(`Not support getPublicKey method`);
  };

  const signAndExecuteTransaction = async (
    transaction: SignableTransaction
  ) => {
    if (wallet === null) throw Error('Wallet Not Connected');
    return await commonCallAdapterFunc(
      wallet,
      'signAndExecuteTransaction',
      reConnect,
      transaction
    );
  };

  return (
    <WalletContext.Provider
      value={{
        supportedWallets,
        wallet: (wallet?.adapter || null) as any,
        connecting: status === AccountStatus.connecting,
        connected: status === AccountStatus.connected,
        select: choose,
        connect,
        disconnect,
        getAccounts,
        groupWallets,
        address,
        status,
        signMessage,
        signAndExecuteTransaction,
        getPublicKey,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
