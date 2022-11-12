---
sidebar_position: 3
---

# ConnectWalletModal

## Description

If you want to use your own button, you can use `ConnectWalletModal` to wrap your button just as following.

## Example

```jsx
// index.tsx
import ReactDOM from 'react-dom';
import { getDefaultWallets, useWallet, WalletProvider } from '@suiet/wallet-kit';

const supportedWallets = getDefaultWallets();

function Root() {
  <WalletProvider supportedWallets={supportedWallets}>
    <App />
  </WalletProvider>;
}

ReactDOM.render(<Root />, docoument.getElementById('root'));

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
