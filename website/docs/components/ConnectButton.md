---
sidebar_position: 2
---

# ConnectButton

## Description

ConnectButton is the entry for users to connect their wallet. 

It manages the cycle of wallet connection, such as launching the wallet-select modal, displaying info of the account and showing the disconnect button when connected.

We recommend using `ConnectButton` component to integrate Suiet wallet kit 🥳 But you can customize your own ConnectButton with our api, check [#Advanced-Use Hooks Only](/docs/advanced/hooks-only) for details.

## Examples

```jsx
import {
  ConnectButton,
  WalletProvider,
} from '@suiet/wallet-kit';

function App() {
  return (
    <WalletProvider>
      <ConnectButton>Connect Wallet</ConnectButton>
    </WalletProvider>
  );
}
```

## API

### Props

| Properties | Description | Type                | Default          |
| ---------- | ----------- | ------------------- | ---------------- |
| children   | --          | ReactNode           | 'Connect Wallet' |
| style      | --          | React.CSSProperties |                  |
| className  | --          | string              |                  |
