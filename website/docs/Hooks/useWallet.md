---
sidebar_position: 1
---

# useWallet

## Introduction

The useWallet hook provides the ability to get the status of account, connect method and move call method.
You can use the hook and provider to connect wallet by your own button and modal.
The useWallet hook will return WalletContextState props.
For detail, you can check the doc https://kit.suiet.app/docs/components/walletprovider#walletcontextstate to get the api reference of WalletContextState.

```ts
const {
  supportedWallets: WalletInstance[]; // all supported wallet list
  groupWallets: Record<string, WalletInstance[]>; // grouped wallet map, now include recent and popular group
  wallet: WalletInstance | null; // Wallet that we are currently connected to

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

The useWallet hook's returned result can be divided into 4 categories.

1. Wallets. The supportedWallets will return all the wallets you passed to the WalletProvider. For example:

```jsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <YourComponent />
</WalletProvider>;

// in your component
function YourComponent() {
  const { supportedWallets } = useWallet(); // it's the same as previous supportedWallets
}
```

The groupWallets means the grouped wallets. It's like the below example. Generally you don't need to use it.

```ts
const groupWallets = {
  popular: [SuietWallet()], // wallet list
  recent: [SuietWallet()], // wallet list
};
```

The wallet is the currently selected wallet in the `supportedWallets`.
You can check the doc https://kit.suiet.app/docs/components/WalletProvider#walletinstance to learn the wallet type.

2. Wallet status. The connecting, connected, and status are all related to the wallet's connection status. Their relationship is as follows:

```js
const { status, connected, connecting } = useWallet();

assert(status === 'connecting', connecting);
assert(status === 'connected', connected);
```

After you connect to the wallet, you can get the account address from `useWallet` hook. The address is just like `0x84bf9b49a3db40cb022c371af2ac6cb3017a712b`.

3. Connect method. In most cases, you do not need to use these methods.

4. Adapter's common method. The `getAccounts`, `executeMoveCall` and `executeSerializedMoveCal`l` is just the adapter's method.
   The `getAccounts` will return all account address of the current wallet. The `executeMoveCall` and `executeSerializedMoveCall` is related to transaction of sui.
   For detail, you can check the sui official doc https://docs.sui.io/sui-jsonrpc#sui_executeTransaction.
