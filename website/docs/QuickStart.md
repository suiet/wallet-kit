---
title: Quick Start
sidebar_position: 1
---

Hello my friend π Welcome onboard π³

Suiet wallet kit is a wallet aggregator for DApps to interact with all the wallets in Suiπ§ ecosystem easily. π₯³

Let's try our kit and empower your dapp in minutes. πͺ

> β­οΈ Have fun with [Demo Playground](https://wallet-kit-demo.vercel.app/) + [Example repo](https://github.com/suiet/wallet-kit/tree/main/examples/with-vite)

## π¨ Setup

First of all, let's install the npm package `@suiet/wallet-kit` to your project.

> npm package: https://www.npmjs.com/package/@suiet/wallet-kit

```shell
npm install @suiet/wallet-kit
# or
yarn add @suiet/wallet-kit
# or
pnpm install @suiet/wallet-kit
```

Then wrap your `<App />` with our context provider, so that our hooks can work nicely inside your dapp.

Oh don't forget to import our css to enable default styles π¨

```jsx
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

// take react@18 project as an example
ReactDOM.createRoot(document.getElementById('root')).render(
  <WalletProvider>
    <App />
  </WalletProvider>
);
```

> By default, suiet kit will load all the [preset wallets](./CanIUse#preset-wallets) to the listπ‘

## πΉ Place ConnectButton

:::tip
We recommend to use hooks together with our components. But if you want to use our hooks only with your customized UI components, follow the instruction [#Use Hooks Only](/docs/tutorial/hooks-only)
:::

Just import our `<ConnectButton />` and place it to wherever you like, such as Header.

```jsx
import { ConnectButton } from '@suiet/wallet-kit';

const App = () => {
  return (
    <>
      <header>
        <ConnectButton />
      </header>
      <... />
    </>
  )
};
```

## πͺ Use Wallet Capabilities

After your dapp connects to a wallet that supports [Sui wallet-standard](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/packages/wallet-standard), your dapp is already empowered and able to call wallet capabilities.π

> Please explore the docs for further usage information π‘

```jsx
import { useWallet } from '@suiet/wallet-kit';

const App = () => {
  const wallet = useWallet()
  
  useEffect(() => {
    if (!wallet.connected) return;
    console.log('connected wallet name: ', wallet.name)
    console.log('account address: ', wallet.account?.address)
    console.log('account publicKey: ', wallet.account?.publicKey)
  }, [wallet.connected])
  
  async function handleExecuteMoveCall() {
    await wallet.executeMoveCall(...);
  }
  async function handleExecuteTransaction() {
    await wallet.signAndExecuteTransaction(...);
  }
  async function handleSignMessage() {
    await wallet.signMessage(...);
  }

  return (<.../>)
};
```

Continue to BUIDL your amazing dapp and join the incoming Sui-nami! π

## π More Tutorials

Check out this section: [#Tutorials](/docs/category/tutorials)

## π§ Demo Playground

Feel free to play with our [Demo Playground](https://wallet-kit-demo.vercel.app) π ([Github repo](https://github.com/suiet/wallet-kit/tree/main/examples/with-vite))

<img src="/img/integration-example.jpg" />


## π€ Trusted by great Sui projects

- [BlueMove NFT](https://sui.bluemove.net/)
- [Suia POAP](https://suia.io/)
- [DMENS](https://dmens-app.coming.chat/explore)
- [LoyaltyGM NFT](https://www.loyaltygm.com/)

<img src="/img/trustedby.png" />