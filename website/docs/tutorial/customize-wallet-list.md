---
title: Customize Wallet List
sidebar_position: 1
---

You can configure your wallet list on the select modal by passing `defaultWallets` throught `<WalletProvider />`.

We've prepared a set of [preset wallets](../CanIUse#preset-wallets) that you can import directly, also you can customize new wallet items. By default, we include all the preset wallets.


## Default Usage

:::tip

All the `defaultWallets` will be listed in the Popular section on the wallet-select modal.

:::

```jsx
import {
  WalletProvider,
  SuietWallet,
  SuiWallet,
  EthosWallet,
  IDefaultWallet,
} from '@suiet/wallet-kit';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider defaultWallets={[
      // order defined by you
      SuietWallet,
      SuiWallet,
      EthosWallet,
      // ...
    ]}>
    {/* or just leave it as default which contains all preset wallets */}
    {/*<WalletProvider>*/}
      <App />
    </WalletProvider>
  </React.StrictMode>
)
```

## Using Hook Only

If you use our `useWallet` hook only and have a customized wallet-select modal, then you can access configured wallet list by `configuredWallets` from `useWallet`. Also we provide `detectedWallets` for those wallets which are not preconfigured but detected from user browser.

```tsx
// make sure this code is under <WalletProvider />

function App() {
  const {configuredWallets, detectedWallets} = useWallet();
  
  return (
    <>
      <CustomizedWalletModal list={[...configuredWallets, ...detectedWallets]} />
    </>
  )
}
```

## Define New Wallet

If our wallet presets do not cover the wallets you need, you can simply define it using our  `defineWallet` function.

```jsx
import {
  WalletProvider,
  defineWallet,
} from '@suiet/wallet-kit';

// customized wallet must support @mysten/wallet-standard
const CustomizeWallet = defineWallet({
  name: "myWallet",
  iconUrl: "external url or data url",
  downloadUrl: {
    browserExtension: 'download page url of chrome extension...'
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider defaultWallets={[
      CustomizeWallet,
      // ...
    ]}>
      <App />
    </WalletProvider>
  </React.StrictMode>
)
```