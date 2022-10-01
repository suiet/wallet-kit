---
sidebar_position: 3
---

# ConnectWalletModal

## Description

If you want to use your own button, you can use ConnectWalletModal to wrap your button just as following.

## Example

```jsx
// index.tsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <App />
</WalletProvider>;

// App.tsx
function App() {
  const { groupWallets } = useWallet()

  return (
  <ConnectWalletModal
    groupWallets={groupWallets}
    onWalletClick={(wallet) => {
      if (!wallet.installed) return;
      select(wallet.name);
    }}
  >
    <YourOwnButton></YourOwnButton>
  </ConnectWalletModal>;
  )
}

```

## API

| Properties    | Description                                             | Type                                | Default |
| ------------- | ------------------------------------------------------- | ----------------------------------- | ------- |
| groupWallets  | grouped wallet list, you can get it with useWallet hook | Record&lt;string, WalletInstance[]> | {}      |
| onWalletClick | will trigger when click wallet list item                | (wallet: WalletInstance) => {}      |         |
