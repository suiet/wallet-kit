---
title: Hooks
sidebar_position: 3
---

# Hooks

## useWallet

The useWallet hook provide the ability to get the status of account, connect method and move call method. You can use the hook and provider to connect wallet by your own button and modal.

```ts
const {
  supportedWallets: WalletInstance[]; // all supported wallet list
  groupWallets: Record<string, WalletInstance[]>; // grouped wallet map, now include recent and popular group
  wallet: Wallet | null; // Wallet that we are currently connected to

  connecting: boolean;
  connected: boolean;
  address: string; // currently coonected account address
  status: 'disconnected' | 'connected' | 'connecting';

  select(walletName: string): void; // select which wallet to connect
  connect: (walletInstance: WalletInstance) => Promise<void>; // connect to the wallet which you passed in
  disconnect(): Promise<void>; // disconnect the connected wallet's connection

  getAccounts: () => Promise<SuiAddress[]>; // get all your wallets' accounts
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>; // adapter's executeMoveCall
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>; // adapter's executeSerializedMoveCall
} = useWallet();
```

## useSuiProvider

```ts
const {
  getOwnedObjectRefs,
  getTransaction,
  getEventsByTransaction,
  getEventsBySender,
} = useSuiProvider();
```

## useAccountBalance

You can get balance of the current account under selected network.

```ts
interface AccountBalanceResponse {
  error: Error; // an error object
  loading: boolean;
  balance: string; // balance of the current account, when loading or error, it will be 0
}

const { error, loading, balance } = useAccountBalance();
```
