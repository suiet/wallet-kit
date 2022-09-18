// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
  MoveCallTransaction,
  SuiAddress,
  SuiTransactionResponse,
} from '@mysten/sui.js';
import { createContext, useContext } from 'react';
import { WalletAdapter } from '@mysten/wallet-adapter-base';
import { WalletInstance } from '../adapter/KitAdapter';

export interface WalletContextState {
  // Supported Wallets
  supportedWallets: WalletInstance[];
  groupWallets: Record<string, WalletInstance[]>;
  // Wallet that we are currently connected to
  wallet: WalletInstance | null;

  connecting: boolean;
  connected: boolean;
  // disconnecting: boolean;

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

const EMPTY_ARRAY: never[] = [];

const DEFAULT_CONTEXT: WalletContextState = {
  supportedWallets: [],
  groupWallets: [],
  wallet: null,
  connecting: false,
  connected: false,
  select(_name: string) {
    console.error(constructMissingProviderErrorMessage('get', 'select'));
  },
  async connect() {
    return await Promise.reject(
      console.error(constructMissingProviderErrorMessage('get', 'connect'))
    );
  },
  async disconnect() {
    return await Promise.reject(
      console.error(constructMissingProviderErrorMessage('get', 'disconnect'))
    );
  },
  async getAccounts() {
    return await Promise.reject(
      console.error(constructMissingProviderErrorMessage('get', 'getAccounts'))
    );
  },
  async executeMoveCall(
    transaction: MoveCallTransaction
  ): Promise<SuiTransactionResponse> {
    return await Promise.reject(
      console.error(
        constructMissingProviderErrorMessage('get', 'executeMoveCall')
      )
    );
  },
  async executeSerializedMoveCall(
    transactionBytes: Uint8Array
  ): Promise<SuiTransactionResponse> {
    return await Promise.reject(
      console.error(
        constructMissingProviderErrorMessage('get', 'executeSerializedMoveCall')
      )
    );
  },
};

// Reword these, they are from Solana's repo
Object.defineProperty(DEFAULT_CONTEXT, 'wallets', {
  get() {
    console.error(constructMissingProviderErrorMessage('read', 'wallets'));
    return EMPTY_ARRAY;
  },
});
Object.defineProperty(DEFAULT_CONTEXT, 'wallet', {
  get() {
    console.error(constructMissingProviderErrorMessage('read', 'wallet'));
    return null;
  },
});
Object.defineProperty(DEFAULT_CONTEXT, 'publicKey', {
  get() {
    console.error(constructMissingProviderErrorMessage('read', 'publicKey'));
    return null;
  },
});

function constructMissingProviderErrorMessage(
  action: string,
  valueName: string
) {
  return (
    'You have tried to ' +
    ` ${action} "${valueName}"` +
    ' on a WalletContext without providing one.' +
    ' Make sure to render a WalletProvider' +
    ' as an ancestor of the component that uses ' +
    'WalletContext'
  );
}

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
