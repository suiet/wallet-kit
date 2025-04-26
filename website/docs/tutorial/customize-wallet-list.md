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

## Add Slush Web Wallet

[Slush Web Wallet](https://my.slush.app/) is a new web wallet empowered by ZkSend, launched by Mysten Lab, which aims to onboard new users to web3 in a easy way.

> More details about the capabilities and limitations of Slush Web Wallet, please refer to [dApp Integration - Sui Typescript SDK](https://sdk.mystenlabs.com/zksend/dapp)

Suiet wallet kit supports DApp to integrate Slush Web Wallet by simple configurations. 

Firstly, locate the component that uses `<WalletProvider />`. Then define the Slush Web Wallet config by `defineSlushWallet` function. You need to pass your DApp name as parameter, which will be displayed when connecting to the Slush Web Wallet.

Secondly, add the Slush Web Wallet to the `defaultWallets` array in `<WalletProvider />`. If you want to use the default presets along with the Slush Web Wallet, you can simply add the Slush Web Wallet to the array.

```tsx
import {
  WalletProvider,
  defineSlushWallet,
  AllDefaultWallets,
} from "@suiet/wallet-kit";

const slushWebWalletConfig = defineSlushWallet({
  appName: "Your DApp Name",
});

export default function App() {
  return (
    <WalletProvider defaultWallets={[
      ...AllDefaultWallets,
      slushWebWalletConfig,
    ]}>
      <YourComponent />
    </WalletProvider>
  );
}
```

There we go! Now you can see the Slush Web Wallet in the wallet-select modal.

![slush-web-wallet-integration](/img/slush-web-wallet-integration.png)



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
