---
sidebar_position: 1
---

# WalletProvider

## Description

The `WalletProvider` provides the essential data and functions for our kit. And it is the entrypoint for customized configurations.

:::tip

So you need to wrap all the kit hooks and components under `WalletProvider` before you start to use them.

:::

## Examples

### Basic Usage

```jsx
import ReactDOM from 'react-dom';
import { useWallet } from '@suiet/wallet-kit';

function Root() {
  // wrap your app component
  <WalletProvider>
    <App />
  </WalletProvider>;
}

ReactDOM.render(<Root />, docoument.getElementById('root'));
```

### Customize your wallet list on modal

You can configure your wallet list on the select modal by passing `defaultWallets` throught `<WalletProvider />`.

We've prepared a set of [preset wallets](../CanIUse#preset-wallets) that you can import directly, also you can customize new wallet items following the IDefaultWallet Interface. By default we include all the preset wallets.

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

// customized wallet must support @mysten/wallet-standard
const CustomizeWallet: IDefaultWallet = {
  name: "myWallet",
  iconUrl: "external url or data url",
  downloadUrl: {
    browserExtension: 'chrome extension store url...'
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider defaultWallets={[
      // order defined by you
      SuietWallet,
      SuiWallet,
      EthosWallet,
      CustomizeWallet,
      // ...
    ]}>
    {/* or just leave it as default which contains all preset wallets */}
    {/*<WalletProvider>*/}
      <App />
    </WalletProvider>
  </React.StrictMode>
)
```

If you use our `useWallet` hook only and have a customized wallet-select modal, then you can access configured wallet list by `configuredWallets` from `useWallet`. Also we provide `detectedWallets` for those wallets which are not preconfigured but detected from user browser.

```
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

## API

### Props

|Prop|Type|Default|Description|
|:-:|:-:|:-:|:-:|
|defaultWallets|[IDefaultWallet](/docs/Types#idefaultwallet)|[...[AllPresetWallets](../CanIUse#preset-wallets)]|Configure wallet list for dapp, by default we load all the preset wallets|
|autoConnect|boolean|true|Auto connect to the last connected wallet when launched|
|[Deprecated] supportedWallets|`Array<any>`|[]|default wallets show on ConnectWalletModal, use defaultWallets instead (Not used anymore since v0.1.x)|
