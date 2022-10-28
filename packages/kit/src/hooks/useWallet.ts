import {
  MoveCallTransaction,
  SuiAddress,
  SuiTransactionResponse,
  SignableTransaction,
} from '@mysten/sui.js';
import { createContext, useContext } from 'react';
import {
  SignMessageInput,
  SignMessageOutput,
  WalletInstance,
} from '../adapter/KitAdapter';
import { StandardWalletAdapter } from '../standard/WalletStandard';

export interface WalletContextState {
  // Supported Wallets
  supportedWallets: WalletInstance[];
  groupWallets: Record<string, WalletInstance[]>;
  // Wallet that we are currently connected to
  wallet: StandardWalletAdapter | null;

  connecting: boolean;
  connected: boolean;
  status: 'disconnected' | 'connected' | 'connecting';
  address: string;

  select: (walletName: string) => void;
  connect: (walletInstance: WalletInstance) => Promise<void>;
  disconnect: () => Promise<void>;

  getAccounts: () => Promise<SuiAddress[]>;
  signAndExecuteTransaction(
    transaction: SignableTransaction
  ): Promise<SuiTransactionResponse>;

  // /** @deprecated Prefer `signAndExecuteTransaction` when available. */
  // executeMoveCall: (
  //   transaction: MoveCallTransaction
  // ) => Promise<SuiTransactionResponse>;
  // /** @deprecated Prefer `signAndExecuteTransaction` when available. */
  // executeSerializedMoveCall: (
  //   transactionBytes: Uint8Array
  // ) => Promise<SuiTransactionResponse>;
  signMessage: (input: SignMessageInput) => Promise<SignMessageOutput | null>;
  getPublicKey: () => Promise<string>;
}

function missProviderMessage(action: string) {
  return `Error to run method ${action}, please make sure useWallet use in a proper provider`;
}

const DEFAULT_CONTEXT: WalletContextState = {
  supportedWallets: [],
  groupWallets: {},
  wallet: null,
  connecting: false,
  connected: false,
  address: '',
  status: 'disconnected',
  select(_name: string) {
    console.error(missProviderMessage('select'));
  },
  async signMessage() {
    return await Promise.reject(console.error(missProviderMessage('connect')));
  },
  async connect() {
    return await Promise.reject(console.error(missProviderMessage('connect')));
  },
  async disconnect() {
    return await Promise.reject(
      console.error(missProviderMessage('disconnect'))
    );
  },
  async getAccounts() {
    return await Promise.reject(
      console.error(missProviderMessage('getAccounts'))
    );
  },
  async signAndExecuteTransaction() {
    return await Promise.reject(
      console.error(missProviderMessage('signAndExecuteTransaction'))
    );
  },
  async getPublicKey() {
    return await Promise.reject(
      console.error(missProviderMessage('getPublicKey'))
    );
  },
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
