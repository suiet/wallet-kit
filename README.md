<a href="https://suiet.app"><p align="center">
<img width="480" src="/assets/LogoWithSlogen.png"/>
</a>

# Suiet wallet kit, connection made easy

> 👋 If you want to know how to **install/use** suiet, please visit our offical website [suiet.app](https://suiet.app) or [docs](https://suiet.app/docs)

Suiet wallet kit is a wallet aggregator for DApps to interact with all the wallets in Sui💧 ecosystem easily 🥳

We present **React Provider & Hooks, UI components** for the DApp (React) developers to connect your DApp and all the wallet extensions 🔗 Integration solution or customization are both supported ✅

> 💡 Demo Here: https://kit.suiet.app/

<img src="/assets/wallet-kit.png" />

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

Through the `executeMoveCall` function, our dapp can send `mint` / `transfer` / etc.. function to the wallet extensions.

```jsx
import {useWallet} from "@suiet/wallet-kit";

function App() {
  const {
    connected,
    executeMoveCall,
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
      const resData = await executeMoveCall(data);
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

## Hook `useWallet`

|Property|description|[Suiet Wallet](https://github.com/suiet/wallet-adapter)|[Sui Wallet](https://github.com/MystenLabs/sui/blob/main/sdk/wallet-adapter/packages/adapters/sui-wallet/src/adapter.ts)|[Ethos Wallet](https://ethoswallet.xyz/)|[Wave Wallet](https://www.wavewallet.app/)|[Hydro Wallet](https://hydro.tech/)|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|name|connected wallet's name|✅|✅|Not published|Not published|Not published|
|connected|wallet connected status|✅|✅|Not published|Not published|Not published|
|connecting|wallet connecting status|✅|✅|Not published|Not published|Not published|
|select|function that connects to the wallet|✅|✅|Not published|Not published|Not published|
|disconnect|function that disconnects current wallet|✅|✅|Not published|Not published|Not published|
|getAccounts|function that gets accounts info from current wallet|✅|✅|Not published|Not published|Not published|
|executeMoveCall|function that executes move-calls via wallet|✅|✅|Not published|Not published|Not published|
|executeSerializedMoveCall|function that executes serialized move-calls via wallet|✅|✅|Not published|Not published|Not published|
|signMessage|function that requests message signing from users|✅|❌|Not published|Not published|Not published|