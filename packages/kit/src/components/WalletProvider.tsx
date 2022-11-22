import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {WalletContext} from "../hooks/useWallet";
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
import {KitError} from "../errors";
import {AllDefaultWallets} from "../wallet/default-wallets";
import { Extendable } from '../types/utils';
import {isNonEmptyArray} from "../utils";
import {MoveCallTransaction, SuiTransactionResponse} from "@mysten/sui.js";
import {FeatureName} from "../wallet/wallet-adapter";
import {deprecatedWarn} from "../legacy/tips";
import {WalletEvent, WalletEventListeners} from "../types/events";
import {useAvailableWallets} from "../hooks/useAvaibleWallets";
import {useAutoConnect} from "../hooks/useAutoConnect";
import {Storage} from "../utils/storage";
import {StorageKey} from "../constants/storage";

export type WalletProviderProps = Extendable & {
  defaultWallets?: IDefaultWallet[];
  /**
   * @deprecated use defaultWallets to customize wallet list
   */
  supportedWallets?: any[];
};

export const WalletProvider = (props: WalletProviderProps) => {
  const {defaultWallets = AllDefaultWallets, children} = props;
  const storage = useRef(new Storage())

  const {
    allAvailableWallets,
    configuredWallets,
    detectedWallets
  } = useAvailableWallets(defaultWallets);

  const [walletAdapter, setWalletAdapter] = useState<IWalletAdapter | undefined>();
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const walletOffListeners = useRef<(() => void)[]>([])

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

  const connect = useCallback(
    async (adapter: IWalletAdapter, opts?: ConnectInput) => {
      if (!adapter) throw new KitError("param adapter is missing");

      setStatus(ConnectionStatus.CONNECTING);
      try {
        const res = await adapter.connect(opts);
        setWalletAdapter(adapter);
        setStatus(ConnectionStatus.CONNECTED);
        storage.current.setItem(StorageKey.LAST_CONNECT_WALLET_NAME, adapter.name)
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
        walletOffListeners.current.forEach(off => {
          try {
            off()
          } catch (e) {
            console.error('error when clearing wallet listener', (e as any).message)
          }
        })
      walletOffListeners.current = []  // empty array
    }
    try {
      // disconnect is an optional action for wallet
      if (adapter.hasFeature(FeatureName.STANDARD__DISCONNECT)) {
        await adapter.disconnect();
      }
    } finally {
      setWalletAdapter(undefined);
      setStatus(ConnectionStatus.DISCONNECTED);
    }
  }, [walletAdapter, status]);

  const select = useCallback(async (walletName: string) => {
    // disconnect previous connection if it exists
    if (isCallable(walletAdapter, status)) {
      const adapter = walletAdapter as IWalletAdapter;
      // Same wallet, ignore
      if (walletName === adapter.name) return;

      // else first disconnect current wallet
      await disconnect()
    }

    const wallet = allAvailableWallets.find((wallet) => wallet.name === walletName);
    if (!wallet) {
      const availableWalletNames = allAvailableWallets.map(wallet => wallet.name)
      throw new KitError(`select failed: wallet ${walletName} is not available, all wallets are listed here: [${availableWalletNames.join(', ')}]`)
    }
    await connect(wallet.adapter as IWalletAdapter)
  }, [walletAdapter, status, allAvailableWallets])

  const on = useCallback((
    event: WalletEvent,
    listener: WalletEventListeners[WalletEvent]
  ) => {
    ensureCallable(walletAdapter, status);
    const _wallet = walletAdapter as IWalletAdapter;

    // filter event and params to decide when to emit
    const off = _wallet.on('change', (params) => {
      if (event === 'change') {
        const _listener = listener as WalletEventListeners['change']
        _listener(params)
        return
      }
      if (isNonEmptyArray(params.chains) && event === 'chainChange') {
        const _listener = listener as WalletEventListeners['chainChange']
        _listener({ chain: (params.chains as any)[0] })
        return
      }
      if (isNonEmptyArray(params.accounts) && event === 'accountChange') {
        const _listener = listener as WalletEventListeners['accountChange']
        _listener({ account: (params.accounts as any)[0] })
        return
      }
      if (Array.isArray(params.features) && event === 'featureChange') {
        const _listener = listener as WalletEventListeners['featureChange']
        _listener({ features: params.features })
        return
      }
    })
    walletOffListeners.current.push(off);  // should help user manage off cleaners
    return off
  }, [walletAdapter, status])

  const getAccounts = useCallback(() => {
    ensureCallable(walletAdapter, status);
    const _wallet = walletAdapter as IWalletAdapter;
    return _wallet.accounts;
  }, [walletAdapter, status]);

  const signAndExecuteTransaction = useCallback(
    async (transaction: SuiSignAndExecuteTransactionInput) => {
      ensureCallable(walletAdapter, status);
      const _wallet = walletAdapter as IWalletAdapter;
      return await _wallet.signAndExecuteTransaction(transaction);
    },
    [walletAdapter, status]
  );

  const signMessage = useCallback(
    async (input: { message: Uint8Array }) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError("no active account");
      }

      const adapter = walletAdapter as IWalletAdapter;
      return await adapter.signMessage({
        account,
        message: input.message,
      });
    },
    [walletAdapter, account, status]
  );

  const executeMoveCall = useCallback((data: MoveCallTransaction) => {
    ensureCallable(walletAdapter, status);
    return signAndExecuteTransaction({
      transaction: {
        kind: 'moveCall',
        data: data
      }
    }) as Promise<SuiTransactionResponse>;
  }, [signAndExecuteTransaction, walletAdapter, status])

  const getPublicKey = useCallback(() => {
    ensureCallable(walletAdapter, status);
    return Promise.resolve((account as WalletAccount).publicKey);
  }, [walletAdapter, account, status])

  useAutoConnect(select, allAvailableWallets)

  // deprecated warnings
  useEffect(() => {
    if (props.supportedWallets) {
      deprecatedWarn({
        name: 'supportedWallets',
        message: 'use defaultWallets to customize wallet list',
        migrationDoc: 'https://kit.suiet.app/docs/migration/upgradeTo0.1.0'
      })
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        name: walletAdapter?.name,
        allAvailableWallets,
        configuredWallets,
        detectedWallets,
        adapter: walletAdapter,
        wallet: walletAdapter,
        status,
        connecting: status === ConnectionStatus.CONNECTING,
        connected: status === ConnectionStatus.CONNECTED,
        select,
        disconnect,
        on,
        getAccounts,
        account,
        signAndExecuteTransaction,
        signMessage,
        address: account?.address,
        supportedWallets: props.supportedWallets ?? [],
        executeMoveCall,
        getPublicKey,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};