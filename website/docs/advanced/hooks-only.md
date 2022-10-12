# Customize - only use hooks

:::tip
You can check the WalletProvider doc and useWallet doc to learn more.
:::

This section describes how to only use hooks to customize. It can be very useful if you want to use your own connect button and modal.

At first, add WalletProvider to wrap your root component.

```jsx
import { WalletProvider, getDefaultWallets } from '@suiet/wallet-kit';

const supportedWallets = getDefaultWallets();

function RootComponent() {
  return (
    <WalletProvider supportedWallets={supportedWallets}>
      <App />
    </WalletProvider>
  );
}
```

The WalletProvider component contains the core logic of kit. So if you use any feature of @suiet/wallet-kit, you should remember to import WalletProvider.

Your App component can be like the following. It may contains a connect button which handle connections and an account info component which shows address after user connected.
:::tip
You have to manage connection status. Prevent doing somehing like trasaction before user connected.
:::

```jsx
import { useWallet } from '@suiet/wallet-kit';
function App() {
  const { connected } = useWallet()

  return (
    <div>
      {
        connected ? <ConnectButton> : <AccountInfo>
      }
    </div>
  )
}
```

In your own ConnectButton, you can use the select method imported from useWallet to connect the SUI wallet or the SUIET wallet. In some sases, you may want to do something when user don't have wallet, you can get the install infomation from wallet instance. For example

```jsx
import { useWallet } from '@suiet/wallet-kit';

function ConnectButton() {
  const { select, supportedWallets } = useWallet();

  return supportedWallets.map((wallet) => (
    <button
      key={wallet.name}
      onClick={() => {
        // check if user install wallet
        if (!wallet.installed) {
          // do somthing
          return;
        }
        select(wallet.name);
      }}
    >
      Connect to {wallet.name}
    </button>
  ));
}
```

After user connect to wallet, you can get user's wallet info and do something like trasaction. For example:

```jsx
import { useWallet } from '@suiet/wallet-kit';

function AccountInfo() {
  const { address } = useWallet();
  return (
    <div>
      <div>address: {address}</div>
      <button
        onClick={() => {
          executeMoveCall(movecallInfo);
        }}
      >
        do trasaction
      </button>
    </div>
  );
}
```
