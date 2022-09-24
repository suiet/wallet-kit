# Components

## WalletProvider

Provide context

- supportedWallets: `undefined` | `Array<Connector>`

```jsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <App />
</WalletProvider>;
```

```ts
interface Context {
  // Supported Wallets
  supportedWallets: WalletInstance[];
  groupWallets: Record<string, WalletInstance[]>;
  // Wallet that we are currently connected to
  wallet: Wallet | null;

  connecting: boolean;
  connected: boolean;
  address: string;
  status: 'disconnected' | 'connected' | 'connecting';

  select(walletName: string): void;
  connect(): Promise<void>;
  disconnect(): Promise<void>;

  getAccounts: () => Promise<SuiAddress[]>;
  executeMoveCall: (
    transaction: MoveCallTransaction
  ) => Promise<SuiTransactionResponse>;
  executeSerializedMoveCall: (
    transactionBytes: Uint8Array
  ) => Promise<SuiTransactionResponse>;
}
```

## ConnectButton

```jsx
<ConnectButton>Connect Wallet</ConnectButton>
```

# Internal

## \_ConnectButton

```jsx
<_ConnectButton
  onClick={}
>
  {props.children}
</_ConnectButton>
```

## WalletInfo

```jsx
<WalletInfo onClick={() => {}} />
```

## WalletSelectorModal

```jsx
<WalletSelectorModal
  title={''}
  connectors={[]}
  onWalletConnected={(wallet: Wallet) => {}}
  onClose={() => {}}
/>
```

## WalletNotInstall

```jsx
<WalletNotInstall
  extInstallation={[
    {
      name: 'xx wallet',
      browser: 'chrome',
      url: 'xxx',
    },
  ]}
></WalletNotInstall>
```

## WalletDropdown

```jsx
<WalletDropdown onSelect={(key: string) => {}}>
  <WalletDropdown.Item key={''} title={''} icon={''} />
</WalletDropdown>
```

## Loading

```jsx
<Loading />
```
