# Upgrade to `v0.1.0`

## Break changes:

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
