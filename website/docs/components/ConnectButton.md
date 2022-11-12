---
sidebar_position: 2
---

# ConnectButton

## Description

We recommend using `ConnectButton` component to integrate Suiet wallet kit 🥳

By using `ConnectButton`, you can use all the features of Suiet kit, such as wallet selection modal, account info display and so on.

## Example

```jsx
import ReactDOM from 'react-dom';
import {
  getDefaultWallets,
  ConnectButton,
  WalletProvider,
} from '@suiet/wallet-kit';

const supportedWallets = getDefaultWallets();

function App() {
  return (
    <WalletProvider supportedWallets={supportedWallets}>
      <ConnectButton>Connect Wallet</ConnectButton>
    </WalletProvider>
  );
}
```

## API

| Properties | Description        | Type                | Default          |
| ---------- | ------------------ | ------------------- | ---------------- |
| children   | show in button     | ReactNode           | 'Connect Wallet' |
| style      | button's style     | React.CSSProperties |                  |
| className  | button's className | string              |                  |
