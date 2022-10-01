---
title: Quick Start
sidebar_position: 1
---

## Manual Setup

Install @suiet/wallet-kit

```shell
npm install @suiet/wallet-kit
# or
yarn add next @suiet/wallet-kit
# or
pnpm add next @suiet/wallet-kit
```

Import css and add provider in the root component

```jsx
import { ConnectButton, WalletProvider } from '@suiet/wallet-kit';
import { getAllWallets, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

const App = () => {
  const supportedWallets = getDefaultWallets();

  return (
    <WalletProvider supportedWallets={supportedWallets}>
      <Yourapp />
    </WalletProvider>
  );
};
```

Finally add connect button to your component such as navbar or header.

```jsx
import { ConnectButton } from '@suiet/wallet-kit';

const YourComponent = () => {

  return (
    <>
      <ConnectButton />
      <YourOtherComponent>
    </>
  )
};
```
