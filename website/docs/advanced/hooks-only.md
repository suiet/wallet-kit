# Use Hooks Only

This section will introduce how to only use the provided hooks. It could be useful when you want to customize your UI components together with our hooks. 

Firstly, add `WalletProvider` to wrap your App. The WalletProvider component provides the context of data and functions.

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

Next, you are supposed to have **a connect button for wallet connection** and **a display area for account info after connection**.

In this case, you can manage these two components by `connected` status from `useWallet` hook.
 And get active account address after connected.

```jsx
import {useWallet} from '@suiet/wallet-kit';
import {useState, useEffect} from "react";

function App() {
  const {connected, address} = useWallet();

  return (
    <div>
      {connected ? <AccountInfo address={address} /> : <ConnectButton />}
    </div>
  )
}
```

For your component of wallet selection, let's just call it WalletSelector. 

You can use `select` method from `useWallet` hook to connect the one of the SUI wallets. 

:::tip
Make sure wallets are installed before using! Remember to handle scenarios that users have not installed specific wallets.
:::

```jsx
import { useWallet } from '@suiet/wallet-kit';

function WalletSelector() {
  const { select, supportedWallets } = useWallet();

  return supportedWallets.map((wallet) => (
    <button
      key={wallet.name}
      onClick={() => {
        // check if user installed the wallet
        if (!wallet.installed) {
          // do something like guiding users to install
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

After a successful connection, you can read account info and make use of all the functions from `useWallet` such as `executeMoveCall` and `signMessage`.

```jsx
import { useWallet } from '@suiet/wallet-kit';

function AccountInfo() {
  const { address, executeMoveCall, signMessage } = useWallet();
  return (
    <div>
      <div>address: {address}</div>
      <button
        onClick={async () => {
          const res = await signAndExecuteTransaction({
            // transaction params...
          });
        }}
      >
        do trasaction
      </button>
      <button
        onClick={async () => {
          const res = await signMessage({
            message: 'hello world!'
          });
        }}
      >
        sign messages
      </button>
    </div>
  );
}
```
