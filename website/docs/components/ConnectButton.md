---
sidebar_position: 2
---

# ConnectButton

## Description

ConnectButton is the entry for users to connect their wallet. 

It manages the cycle of wallet connection, such as launching the wallet-select modal, displaying info of the account and showing the disconnect button when connected.

We recommend using `ConnectButton` component to integrate Suiet wallet kit 🥳 But you can customize your own ConnectButton with our api, check [#Use Hooks Only](/docs/tutorial/hooks-only) for details.

## Examples

### Basic Usage

```jsx
import {
  ConnectButton,
  WalletProvider,
} from '@suiet/wallet-kit';

function App() {
  return (
    <WalletProvider>
      <ConnectButton>Connect Wallet</ConnectButton>
    </WalletProvider>
  );
}
```

### Handle Connection Events

Sometimes you may want to hook in the connection events and do something with those. For example, provide friendly an error tip when the wallet connection fails. You can do it by passing a handle function to the property `onConnectError` of `ConnectButton`.  The full APIs are listed [below](#props).

>  If you are using hooks only, then simply wrap a try-catch block for the async  `select` method!

```jsx
<ConnectButton 
	
/>
function App() {
  return (
    <WalletProvider>
      <ConnectButton
        onConnectError={(error) => {
          console.log("Opps, something went wrong for the connection.", error);
        }}
      >Connect Wallet</ConnectButton>
    </WalletProvider>
  );
}
```

:::tip

The error type is customized by wallet kit. You may want to check [Error Types](/docs/Types#error-types) for details.

:::

## API

### Props

| Properties          | Description                           | Type                         | Default          |
| ------------------- | ------------------------------------- | ---------------------------- | ---------------- |
| children            | --                                    | ReactNode                    | 'Connect Wallet' |
| style               | --                                    | React.CSSProperties          |                  |
| className           | --                                    | string                       |                  |
| onConnectSuccess    | Callback for successful connection    | (walletName: string) => void |                  |
| onConnectError      | Callback for failed connection        | (error: BaseError) => void   |                  |
| onDisconnectSuccess | Callback for successful disconnection | (walletName: string) => void |                  |
| onDisconnectError   | Callback for failed disconnection     | (error: BaseError) => void   |                  |
