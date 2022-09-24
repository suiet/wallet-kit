# Components

## WalletProvider

You must wrap all kit hooks or components in WalletProvider. From WalletProvider, You can get all WalletContextState props with useWallet hook. The basic usage is as follows.

```jsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <App />
</WalletProvider>;
```

All WalletContextState props is as follows.

```ts
interface WalletContextState {
  supportedWallets: WalletInstance[]; // all supported wallet list
  groupWallets: Record<string, WalletInstance[]>; // grouped wallet map, now include recent and popular group
  wallet: Wallet | null; // Wallet that we are currently connected to

  connecting: boolean;
  connected: boolean;
  address: string; // currently coonected account address
  status: 'disconnected' | 'connected' | 'connecting';

  select(walletName: string): void; // select which wallet to connect
  connect(): Promise<void>; // connect to wallet
  disconnect(): Promise<void>; // disconnect connected wallet connection

  getAccounts: () => Promise<SuiAddress[]>; // get all your wallets' accounts
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>; // adapter's executeMoveCall
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>; // adapter's executeSerializedMoveCall
}
```

## ConnectButton

If you use ConnectButton in your App, you'll get all of features of kit, such as modal, connect, disconnect and so on. Use ConnectButton component is also the simplest way
to integrate suiet wallet kit.

```jsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <ConnectButton>Connect Wallet</ConnectButton>
</WalletProvider>;
```

## ConnectWalletModal

If you want to use your own button, you can use ConnectWalletModal to wrap your button just as following.

```jsx
// index.tsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <App />
</WalletProvider>;

// App.tsx
function App() {
  const { groupWallets } = useWallet()

  return (
  <ConnectWalletModal
    groupWallets={groupWallets}
    onWalletClick={(wallet) => {
      if (!wallet.installed) return;
      select(wallet.name);
    }}
  >
    <YourOwnButton></YourOwnButton>
  </ConnectWalletModal>;
  )
}

```
