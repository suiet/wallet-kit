---
sidebar_position: 1
---

## Getting Started

Install

```
npm install @suiet/wallet-kit
# or
yarn add @suiet/wallet-kit
# or
pnpm add @suiet/wallet-kit
```

Import

```
import {
  getDefaultWallets,
  WalletProvider,
  ConnectButton,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
```

Wrap providers

```
const wallets = getDefaultWallets();
<WalletProvider supportedWallets={wallets}>
  <App />
</WalletProvider>
```

Add the connect button

```
const App = () => {
  return (
    <ConnectButton>
  )
}
```
