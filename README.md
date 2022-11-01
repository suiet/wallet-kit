<p align="center"><a href="https://suiet.app">
<img width="480" src="/assets/LogoWithSlogen.png"/>
</a></p>

# Suiet wallet kit, connection made easy

<a href="https://github.com/wallet-standard/wallet-standard">
  <img src="https://badgen.net/badge/wallet-standard/supported/green" />
</a>

> 👋 If you want to know how to **install/use** suiet, please visit our offical website [suiet.app](https://suiet.app) or [docs](https://suiet.app/docs)

Suiet wallet kit is an awesome react toolkit for DApps to interact with all the wallets in Sui💧 easily 🥳

Now we announce the **[Sui Wallet Standard](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/packages/wallet-standard)** is supported ✅ Update to the latest kit version and empower your dapp with auto-detect-wallet feature 🥳 

> ⭐️ That means with our kit, your dapp can automatically detect all the installed wallets which implement wallet-standard in users' browser, rather than manually importing specific wallet adapter.

We present **React Provider & Hooks, UI components** for the DApp (React) developers to connect your DApp and all the wallet extensions 🔗 Integration solution or customization are both supported ✅

> 💡 Demo Here: https://kit.suiet.app/

<img src="/assets/wallet-kit.png" />

## Hook api capabilities

|wallet|name|connected|connecting|select|disconnect|getAccounts|getPublicKey|signMessage|executeMoveCall|executeSerializedMoveCall|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|[Suiet Wallet](https://github.com/suiet/wallet-adapter)|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|
|[Sui Wallet](https://github.com/MystenLabs/sui/blob/main/sdk/wallet-adapter/packages/adapters/sui-wallet/src/adapter.ts)|✅|✅|✅|✅|✅|✅|❌|❌|✅|✅|
|[Ethos Wallet](https://ethoswallet.xyz/)|✅|✅|✅|✅|✅|✅|❌|❌|✅|✅|
|[Wave Wallet](https://www.wavewallet.app/) (Not Published)|/|/|/|/|/|/|/|/|/|/|
|[Hydro Wallet](https://hydro.tech/) (Not Published)|/|/|/|/|/|/|/|/|/|/|
|[Morphis Wallet](https://twitter.com/morphis_wallet) (Not Published)|/|/|/|/|/|/|/|/|/|/|

## 📦 Library Overview

### 💼 Provider

- `WalletProvider` - provide the context containing wallet data source, retrieve functions & smart contract calling functions.

### 🪝  Hooks

- `useWallet` - consumer of the `WalletProvider`, load data & functions into your React component.

### 🕹 UI Components

- `ConnectButton` - the button component for wallet selection and connection management.

## 🚀 Usage Guides

### Prerequisite

1. React project
2. Install the npm package `@suiet/wallet-kit`

```bash
npm install @suiet/wallet-kit
# or
yarn add @suiet/wallet-kit
# or
pnpm add @suiet/wallet-kit
```

### Setup Provider and supported wallets

Import  `WalletProvider` and wrap your App component.

Feel free to choose the wallets you want to support.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {
  WalletProvider,
  getAllWallets,  // support all the wallets
  getDefaultWallets,  // if you only support Sui wallet
} from '@suiet/wallet-kit';

const supportedWallets = getAllWallets();  // let's say we support all the wallets

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider supportedWallets={supportedWallets}>
      <App />
    </WalletProvider>
  </React.StrictMode>
) 
```

### Append ConnectButton wherever you want

Place the `ConnectButton` in the appropriate position, such as `<Header />` component.

```jsx
import {ConnectButton} from "@suiet/wallet-kit";

function Header() {
	return (
		<...>
			<ConnectButton />
		<.../>
	)
}
```

If you want to apply our default styles, please import the css file.

```js
import '@suiet/wallet-kit/style.css';
```

### Use the wallet data and functions!

After the above settings, we can do integrations with wallets now.

Once a user approved the connection request, our dapp can fetch the address of the active account in wallets.

```js
import {useWallet} from "@suiet/wallet-kit";

function Component() {
	const {connected, getAccounts} = useWallet();

  useEffect(() => {
    if (!connected) return;
    (async function () {
      const accounts = await getAccounts();
      console.log('accounts', accounts);  // ['0x0000000000000000000000000000000000000000']
    })()
  }, [connected, getAccounts])
}
```

### Execute Move Call

Through the `signAndExecuteTransaction` function with kind `moveCall`, our dapp can send `mint` / `transfer` / etc.. function to the wallet extensions.

```jsx
import {useWallet} from "@suiet/wallet-kit";

function App() {
  const {
    connected,
    signAndExecuteTransaction
  } = useWallet();
  
  async function mintOneCapybaraForFun() {
    try {
      const data = {
        packageObjectId: "0x2",
        module: "devnet_nft",
        function: "mint",
        typeArguments: [],
        arguments: [
          "name",
          "capy",
          "https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop",
        ],
        gasBudget: 10000,
      }
      const resData = await signAndExecuteTransaction({
        kind: 'moveCall',
        data: data,
      });
      console.log('executeMoveCall success', resData)
      alert('executeMoveCall succeeded (see response in the console)')
    } catch (e) {
      console.error('executeMoveCall failed', e)
      alert('executeMoveCall failed (see response in the console)')
    }
  }
  
  return (
    <...>
      {connected ? <button onClick={mintOneCapybaraForFun}>Mint A Capybara!</button> : null}
    </...>
  ) 
}
```

## Adapter Capabilities Comparison

Due to the adapter difference of each wallet, we present a function comparison table among wallet adapters.

> ⚠️ Remember to handle exceptional cases if some wallet adapters do not support certain features.
