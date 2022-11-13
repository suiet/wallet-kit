---
sidebar_position: 1
---

# WalletProvider

## Description

You must wrap all kit hooks or components in `WalletProvider`. Then you can use all hooks and components provided by `@suiet/wallet-kit`.

## Example

```jsx
import ReactDOM from 'react-dom';
import { useWallet } from '@suiet/wallet-kit';

function Root() {
  <WalletProvider>
    <App />
  </WalletProvider>;
}

ReactDOM.render(<Root />, docoument.getElementById('root'));
```

## API

### supportedWallets

The `supportedWallets` prop is the default wallets show on ConnectWalletModal. Generally, you only need to pass the wallets get from `getDefaultWallets` method. The wallets provided by supportedWallets will always show on ConnectWalletModal. And when user don't install the wallet, we will show the install url for user to let user install the wallet.

Now we support wallet standard and will detect user's wallet which match sui wallet standard. So the wallet not included in supportedWallets, we will also add it to the wallet list and show it on ConnectWalletModal.
