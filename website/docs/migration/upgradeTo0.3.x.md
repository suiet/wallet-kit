---
sidebar_position: 1
---

# Upgrade to v0.3.x

Hi developers, new upgrade is coming 📣 We are proud to announce the Suiet Wallet Kit v0.3.x release 🥳 This release includes several **exciting features**, **important improvements**, and unfortunately, some **breaking changes** as well 🥲 But don't worry, we have prepared a migration guide for you and your dapp to upgrade to this version smoothly ❤️

Due to the upgrade of [Sui Typescript SDK v1](https://sdk.mystenlabs.com/typescript), the new [Sui wallet standard](https://docs.sui.io/standards/wallet-standard), and the emergence of Sui [Stashed Wallet](https://getstashed.com/) with ZKSend, we are upgrading the Suiet Wallet Kit for DApps to catch up with these upgrades.

With the new wallet kit, your dapp can interact with all wallets in the Sui ecosystem via the latest wallet standard. Additionally, there are some breaking changes incurred by the upgrade of Sui Typescript SDK, please read the [migration section](/docs/migration/upgradeTo0.3.x#for-dapp-developers) for instructions.

Moreover, the wallet kit now enables your dapp to easily integrate with the Stashed Wallet built by the Mysten Lab that uses your social account like Google or Twitch to manage your crypto wallet. Please check this [documentation](/docs/tutorial/customize-wallet-list#add-stashed-wallet-new) for more information.


**We recommend all users to upgrade to this version 📣**

:::info
For more details of the migration guide to Sui Typescript SDK v1, check out the [Migration doc for Sui SDK v1](https://sdk.mystenlabs.com/typescript/migrations/sui-1.0)
:::

## For Dapp Developers

### [Major breaking change] - changing Sui SDK from `@mysten/sui.js` to `@mysten/sui`

Due to the upgrade and [renaming of the Sui Typescript SDK v1](https://sdk.mystenlabs.com/typescript/migrations/sui-1.0#changes-to-mystensui), our kit also changes the underlying dependency from `@mysten/sui.js` to `@mysten/sui`. This will ensure that the kit works correctly with the correct dependency.

```npm
npm uninstall @mysten/sui.js
npm install @mysten/sui
```

And then update all the imports in your code:

```diff
- import { SuiClient } from '@mysten/sui.js'
+ import { SuiClient } from '@mysten/sui'
```

### [Major breaking change] - Changing TransactionBlock to Transaction

The TransactionBlock class has been renamed to Transaction according to the Sui Typescript SDK. 

:::info
We are only showing an example of renaming here, but for more API changes related to this, please refer to [the migration doc of Sui Typescript SDK](https://sdk.mystenlabs.com/typescript/migrations/sui-1.0#transaction).
:::

```diff
- import {TransactionBlock} from '@mysten/sui.js/transactions'
+ import {Transaction} from '@mysten/sui/transactions'
```

### [Recommendation] A New Way of Sign and Execute Transaction for your DApp

There is a new recommended way for DApp developer to build things in a way that will work best with wallets as the ecosystem migrates towards [GraphQL](https://sdk.mystenlabs.com/typescript/graphql) and indexer backed APIs. Please refer to the tutorial [Sign and Execute Transactions](/docs/tutorial/sign-and-execute-transactions) for more information.

Fortunately, our wallet kit has integrated the above workflow for dapp developers in the new API `signAndExecuteTransaction` of the useWallet hook. Check the [API Reference](/docs/Hooks/useWallet#signandexecutetransaction) for more information.  

### [New feature] - signAndExecuteTransaction in useWallet

This is a new API that implements the new recommended flow of signing, executing transactions and reporting the results to the connected wallet, which gives your DApp a fine-grained control for the execution and thus benefits the e2e latency and data consistency. 

With this new feature, you can use the `signAndExecuteTransaction` method to sign transactions and have them executed by submitting signed transactions to the fullnode RPC with the control on your DApp side instead of the wallet side. Detail description is in the [API Reference](/docs/Hooks/useWallet#signandexecutetransaction) .

This is an enhanced API of `signAndExecuteTransactionBlock` where the comparison between the two APIs are shown in the [table](/docs/tutorial/sign-and-execute-transactions#api-comparison).

### [New feature] - signTransaction in useWallet

This feature allows you to sign transactions and get the signature using the `signTransaction` method. It's a renaming API from [signTransactionBlock](/docs/Hooks/useWallet#signtransactionblock). Check [API Reference](/docs/Hooks/useWallet#signtransaction).

### [New feature] - Integration with Stashed Wallet

The new wallet kit now supports integration with Stashed Wallet, enabling users to manage their crypto wallets using their social accounts. Please refer to [this section](/docs/tutorial/customize-wallet-list#add-stashed-wallet-new) for integration.

### [Deprecated] - signAndExecuteTransactionBlock in useWallet

The `signAndExecuteTransactionBlock` method has been deprecated and replaced with `signAndExecuteTransaction`. Check [API Reference](/docs/Hooks/useWallet#signtransactionblock).

### [Deprecated] - signTransactionBlock in useWallet

The `signTransactionBlock` method has been deprecated and replaced with `signTransaction`. Check [API Reference](/docs/Hooks/useWallet#signtransaction).

## For Wallet Developer

### [Mandatory] implementing sui:signTransaction and sui:signAndExecuteTransaction

Starting from the wallet standard vXX, the new API `sui:signTransaction` and `sui:signAndExecuteTransaction` are required for enabling the new flow of signing and executing transactions and the replacement of `sui:signTransaction` and `sui:signAndExecuteTransaction` respectively.

:::info
Although the wallet kit will handle the calling for 'sui:signTransaction' vs 'sui:signTransactionBlock', and 'sui:signAndExecuteTransaction' vs 'sui:signAndExecuteTransactionBlock' based on which wallet-standard APIs that are implemented on the target wallet, it is still recommended to implement the new wallet standard APIs as soon as possible for future.
:::

### [Optional]  implementing sui:reportWalletEffect

The sui:reportWalletEffect is meant for wallet to cache the transaction execution response reported by DApps since the new flow of execution is performed on the DApp side. It's an optional implementation for now. Please refer to the wallet standard document for more information.
