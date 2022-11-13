# Upgrade to `v0.1.0`

## Break changes:

### deprecated `supportedWallets` in `WalletProvider`

We have deprecated [`WalletProvider`](/docs/components/WalletProvider) input `supportedWallets` and `v0.1.0`. You will no loger using the

```diff
import ReactDOM from 'react-dom';
+ import { useWallet } from '@suiet/wallet-kit';
- import { getDefaultWallets, useWallet } from '@suiet/wallet-kit';

- const supportedWallets = getDefaultWallets();

function Root() {
+  <WalletProvider>
-  <WalletProvider supportedWallets={supportedWallets}>
    <App />
  </WalletProvider>;
}

ReactDOM.render(<Root />, docoument.getElementById('root'));
```

## internal changes(doesn't affect your code)

### deprecated `wallet-adapter` logic to connect wallets, use `wallet-standard` insted

Now all major wallets in Sui ecosystem have adjusted the new [`wallet-standard`](https://github.com/wallet-standard/wallet-standard), so we removed the support for the old wallet-adapter logic.
