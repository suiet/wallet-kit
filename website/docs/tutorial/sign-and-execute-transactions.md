---
  sidebar_position: 1
---

# Sign and Execute Transactions

There is a new recommended way for DApp developer to build things in a way that will work best with wallets as the ecosystem migrates towards [GraphQL](/) and indexer backed APIs.

The current recommended way to execute transactions for dApps is as follows:

1. The dapp constructs transaction using the [Transaction builder API](https://sdk.mystenlabs.com/typescript/transaction-building/basics)
2. The dapp signs the transaction using the new `sui:signTransaction` feature
1. The wallet kit manages calling either sui:signTransaction or sui:signTransactionBlock depending on which API is implemented in the wallet
3. The dapp executes the transaction using it's own RPC provider (can be either GraphQL, or JSON rpc)
1. It's the key different from the previous workflow where the transactions are executed on the wallet's specified RPC which might increase the e2e latency and incur data inconsistency between fullnodes due to synchronization.
4. The dapp invokes the `sui:reportTransactionEffects` feature with the effects after the transaction is successfully executed.
1. The sui:reportTransactionEffects allows wallets to cache the effects of transactions, enabling transaction building to continue to work, even if the wallets RPC node has not indexed a previous transaction.

This flow enables dapps to have the best possible e2e latency when executing transactions, and enables dapps to query for whatever data you need in response of the execution request.

# Implementation

To implement the above flow, there are two options.

The first option is to use the [signAndExecuteTransaction](/) API from the [useWallet](/) hook.

By default, the API will use the same RPC URL of the current [chain](/) used by your dapp. 

> For more info about configuration of Chain for your DApp, please check the [Turorial: Configure supported chains (networks)](/docs/tutorial/configure-chain). 

```tsx
// assuming in your React component.
import {Transaction} from '@mysten/sui/transactions'

function App() {
  async function performTransaction() {
    const transaction = new Transaction()
    // contruct your transaction using the Transaction builder API mentioned above
    // pass the transaction to signAndExecuteTransaction
    const resData = await wallet.signAndExecuteTransaction({
      transaction: transaction,
    });
    // deal with the response 
  }
}
```



## API Comparison 

Differences between signAndExecuteTransactionBlock and signAndExecuteTransaction are shown below:

| API |     Execution     | FullNode for Execution |                   GraphQL API support                   | 
|:-:|:-----------------:| :-: |:-------------------------------------------------------:|
| signAndExecuteTransactionBlock |   on Wallet | Specified by Wallet |            Depend on wallet's implementation            |
| signAndExecuteTransaction | on DApp | Specified by DApp |     Can be done by customizing the execute function     |           
