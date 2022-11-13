# Upgrade to `v0.1.1`

Upgrade command: `npm install @suiet/wallet-kit@0.1.2`

You can replace `npm` with the package mananger you are using(e.g. npm, yarn, pnpm, etc)

## Break changes:

### `wallet-standard` updated the `signAndExecuteTransaction` structure

```diff
export function Transaction() {
  const { signAndExecuteTransaction } = useWallet();

  const handleClick = async () => {
    // the following example comes from sui wallet official example.
    await signAndExecuteTransaction({
+        transaction:{
          kind: 'moveCall',
          data: {
            packageObjectId: '0x2',
            module: 'devnet_nft',
            function: 'mint',
            typeArguments: [],
            arguments: [
              'name',
              'capy',
              'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
            ],
            gasBudget: 10000,
          }
+       }
    });
  };

  return <button onClick={() => handleClick()}>send transaction</button>;
}
```

### deprecated `supportedWallets` in `WalletProvider`

> If you still bypassing `supportedWallets`, it will not break your code but also take no effect. You will see an warning message in the console.

We have deprecated [`WalletProvider`](/docs/components/WalletProvider) input `supportedWallets` in `v0.1.1`. You will no longer need to pass `supportedWallets` to the provider

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

### deprecated `wallet-adapter` logic to connect wallets, use `wallet-standard` instead

Now all major wallets in Sui ecosystem have adjusted the new [`wallet-standard`](https://github.com/wallet-standard/wallet-standard), so we removed the support for the old wallet-adapter logic.
