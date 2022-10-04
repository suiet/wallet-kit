import {
  MoveCallTransaction,
  SuiAddress,
  SuiTransactionResponse,
} from '@mysten/sui.js';
import { createContext, useContext } from 'react';
import {
  SignMessageInput,
  SignMessageOutput,
  WalletInstance,
} from '../adapter/KitAdapter';
import { SuietWalletAdapter } from '@suiet/wallet-adapter';

export interface WalletContextState {
  // Supported Wallets
  supportedWallets: WalletInstance[];
  groupWallets: Record<string, WalletInstance[]>;
  // Wallet that we are currently connected to
  wallet: WalletInstance | null;

  connecting: boolean;
  connected: boolean;
  status: 'disconnected' | 'connected' | 'connecting';
  address: string;

  select: (walletName: string) => void;
  connect: (walletInstance: WalletInstance) => Promise<void>;
  disconnect: () => Promise<void>;

  getAccounts: () => Promise<SuiAddress[]>;
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>;
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>;
  signMessage: (input: SignMessageInput) => Promise<{
    error: Error | null;
    data: SignMessageOutput | null;
  }>;
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
  async executeMoveCall(
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> {
    return await Promise.reject(
      console.error(missProviderMessage('executeMoveCall'))
    );
  },
  async executeSerializedMoveCall(
    transactionBytes: Uint8Array
  ): Promise<SuiTransactionResponse> {
    return await Promise.reject(
      console.error(missProviderMessage('executeSerializedMoveCall'))
    );
  },
};

export const WalletContext = createContext<any>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
