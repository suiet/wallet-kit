---
sidebar_position: 1
---

# ConnectButton

## Description

If you use `ConnectButton` in your App, you'll get all of features of kit, such as modal, connect, disconnect and so on.
Use `ConnectButton` component is also the simplest way to integrate Suiet wallet kit.

## Example

```jsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <ConnectButton>Connect Wallet</ConnectButton>
</WalletProvider>;
```

## API

| Properties | Description        | Type                | Default          |
| ---------- | ------------------ | ------------------- | ---------------- |
| children   | show in button     | ReactNode           | 'Connect Wallet' |
| style      | button's style     | React.CSSProperties |                  |
| className  | button's className | string              |                  |
