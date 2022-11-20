# Use Hooks Only

This section will introduce how to only use the provided hooks. 

It could be useful when you want to customize your UI components together with our hooks. 

### Customize your UI components with Kit Hooks

Firstly, add `WalletProvider` to wrap your App. The WalletProvider component provides the context of data and functions.

> For customizing the default wallet list, check [WalletProvider](/docs/components/WalletProvider#customize-your-wallet-list-on-modal)

```jsx
import { WalletProvider } from '@suiet/wallet-kit';

function RootComponent() {
  return (
    <WalletProvider>
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
  const wallet = useWallet();

  return (
    <div>
      {wallet.connected ? <AccountInfo address={wallet?.address} /> : <ConnectButton />}
    </div>
  )
}
```

For your wallet-select modal component, let's just call it WalletSelector. 

You can use `select` method from `useWallet` hook to connect the one of the SUI wallets. 

```jsx
import { useWallet } from '@suiet/wallet-kit';

function WalletSelector() {
  const { 
    select,  // select 
    configuredWallets,  // default wallets
    detectedWallets,  // Sui-standard wallets detected from browser env
    allAvailableWallets,  // all the installed Sui-standard wallets
  } = useWallet();

  return [...configuredWallets, ...detectedWallets].map((wallet) => (
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

T
