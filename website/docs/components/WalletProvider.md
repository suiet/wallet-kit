---
sidebar_position: 2
---

# WalletProvider

## Description

You must wrap all kit hooks or components in WalletProvider. From WalletProvider, You can get all WalletContextState props with useWallet hook. The basic usage is as follows.

## Example

```jsx
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <App />
</WalletProvider>;
```

## API

All WalletContextState props and method is as following.

### WalletContextState

You can get WalletContextState

| Properties       | Description                                              | Type                                          | Default        |
| ---------------- | -------------------------------------------------------- | --------------------------------------------- | -------------- |
| supportedWallets | all supported wallet list                                | WalletInstance[]                              | []             |
| groupWallets     | grouped wallet map, now include recent and popular group | Record&lt;string, WalletInstance[]>           | {}             |
| wallet           | wallet that we are currently connected to                | Wallet \| null                                | null           |
| connecting       | connecting to wallet                                     | boolean                                       | false          |
| connected        |                                                          | boolean                                       | false          |
| status           | wallet connection status                                 | 'disconnected' \| 'connected' \| 'connecting' | 'disconnected' |

| Method                    | Description                                | Type                                                                     |
| ------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| select                    | select which wallet to connect             | (walletName: string)=> void                                              |
| connect                   | connect to the wallet which you passed in  | (walletInstance: WalletInstance) => Promise&lt;void>                     |
| disconnect                | disconnect the connected wallet connection | ()=> Promise&lt;void>                                                    |
| getAccounts               | get all your wallets' accounts             | () => Promise&lt;SuiAddress[]>                                           |
| executeMoveCall           | adapter's executeMoveCall                  | (transaction: MoveCallTransaction) => Promise&lt;SuiTransactionResponse> |
| executeSerializedMoveCall | adapter's executeSerializedMoveCall        | (transactionBytes: Uint8Array) => Promise&lt;SuiTransactionResponse>     |

### WalletInstance

| Properties | Description                                    | Type    | Default |
| ---------- | ---------------------------------------------- | ------- | ------- |
| installed  | wallet installed or not                        | boolean | false   |
| name       | then name of wallet, will show on select modal | string  | ''      |
| adpter     | the instance of wallet adpter                  |         |         |
| index      | the index of the item in wallet list           | number  |         |
