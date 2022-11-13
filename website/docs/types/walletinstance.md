### WalletContextState

You can get `WalletContextState`

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
