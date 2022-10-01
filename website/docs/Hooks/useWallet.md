---
sidebar_position: 1
---

# useWallet

The useWallet hook provide the ability to get the status of account, connect method and move call method. You can use the hook and provider to connect wallet by your own button and modal. The useWallet hook will return WalletContextState props, for detail, you can check the doc https://kit.suiet.app/docs/components/walletprovider#walletcontextstate.

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
