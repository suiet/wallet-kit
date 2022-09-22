import {
  MoveCallTransaction,
  SuiAddress,
  SuiTransactionResponse,
} from '@mysten/sui.js';
import { createContext, useContext } from 'react';
import { WalletInstance } from '../adapter/KitAdapter';

export interface WalletContextState {
  // Supported Wallets
  supportedWallets: WalletInstance[];
  groupWallets: Record<string, WalletInstance[]>;
  // Wallet that we are currently connected to
  wallet: WalletInstance | null;

  connecting: boolean;
  connected: boolean;
  address: string;

  select: (walletName: string) => void;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

  getAccounts: () => Promise<SuiAddress[]>;
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>;
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>;
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
  select(_name: string) {
    console.error(missProviderMessage('select'));
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
