# Upgrade to `v0.1.0`

## Break changes:

### deprecated `supportedWallets` in `WalletProvider`

We have deprecated [`WalletProvider`](/docs/components/WalletProvider) input `supportedWallets` and `v0.1.0`. You will no longer need to pass `supportedWallets`

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

### Support new sui `MIST` unit

> read more: https://sui.io/resources-sui/announcing-mist/

With the update of MIST, now 100,000,000 SUI becomes 1 SUI. We have made adjustments in the balance display in UI components.

And if you are using the `useAccountBalance` hook, you the balance you got will also change to smallest unit, `MIST`. You can manually convert it to `SUI` by dividing 1000,000,000.


### deprecated `wallet-adapter` logic to connect wallets, use `wallet-standard` insted

Now all major wallets in Sui ecosystem have adjusted the new [`wallet-standard`](https://github.com/wallet-standard/wallet-standard), so we removed the support for the old wallet-adapter logic.
