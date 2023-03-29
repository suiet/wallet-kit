---
sidebar_position: 1
---

# Upgrade to v0.2.x

Attention everyone 📣 We are happy to embrace the available Sui Release 0.29 for devnet 🥳

This release includes a lot of **new features** and **bug fixes**, and unfortunately, many **breaking changes** as well
🥲

But don't worry, we have prepared a migration guide for you and your dapp to upgrade to this version smoothly ❤️

**We recommend all users to upgrade to this version 📣**

:::info
For more details of migration guide to Sui Release 0.28, check
out [Sui docs](https://docs.sui.io/doc-updates/sui-migration-guide)
:::

## For Dapp Developers

### [Major breaking change] - signAndExecuteTransaction in useWallet

We've changed the `signAndExecuteTransaction` method to `signAndExecuteTransactionBlock` due
to [the changes in Sui sdk and rpc API](https://github.com/MystenLabs/sui/commit/24d90f32483c5bbc61e060b4146a1150bc076a76)

Also, the input type of `signAndExecuteTransactionBlock` has been changed from `SignableTransaction`
to `TransactionBlock` to match the new API.

:::info
For a detailed migration guide of building transactionBlocks, check
out [Sui docs](https://docs.sui.io/doc-updates/sui-migration-guide#building-and-executing-transaction)
:::

```diff
+ import {TransactionBlock} from "@mysten/sui.js";

async function handleMintNftMoveCall() {
-  const data = {
-    packageObjectId: '0x2',
-    module: 'devnet_nft',
-    function: 'mint',
-    typeArguments: [],
-    arguments: [
-      'name',
-      'capy',
-      'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
-    ],
-  };
+  const tx = new TransactionBlock();
+  tx.moveCall({
+    target: '0x2::devnet_nft::mint',
+    arguments: [
+      tx.pure('name'),
+      tx.pure('capy'),
+      tx.pure('https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop'),
+    ],
+  })

-  await wallet.signAndExecuteTransaction({
-    transaction: {
-      kind: 'moveCall',
-      data
-    }
+  await wallet.signAndExecuteTransactionBlock({
+    transactionBlock: tx
  });
}
```

### [Major breaking change] - signMessage in useWallet

From now on, the `signMessage` method
becomes [a standard method](https://github.com/MystenLabs/sui/blob/main/sdk/wallet-adapter/wallet-standard/src/features/suiSignMessage.ts)
in `@mysten/wallet-standard` since 0.5.0 version.

The breaking change here is the output type has been changed as follows:

```diff
// output type of signMessage
{
-    signedMessage: number[];
+    messageBytes: string;
-    signature: number[];
+    signature: string;
}
```

### [New feature] - signTransaction in useWallet

Sui wallet standard
now [supports signing transactions](https://github.com/MystenLabs/sui/blob/main/sdk/wallet-adapter/wallet-standard/src/features/suiSignTransactionBlock.ts)
.
You can use the `signTransaction` method to sign a transaction and get the signature.

```ts
async function handleSignTransaction() {
  const tx = new TransactionBlock();
  tx.moveCall({
    target: '0x2::nft::mint',
    arguments: [
      tx.pure('name'),
      tx.pure('capy'),
      tx.pure('https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop'),
    ],
  })

  // get the signature of the transaction
  const {signature, transactionBytes} = await wallet.signTransactionBlock({
    transactionBlock: tx,
  });
}
```

### [Deprecated] - executeMoveCall in useWallet

use `signAndExecuteTransactionBlock` instead of `executeMoveCall` in `useWallet`
hook. [API Reference](/docs/Hooks/useWallet#signandexecutetransactionblock)

### [Deprecated] - getPublicKey in useWallet

use `getAccount` instead of `getPublicKey` in `useWallet` hook. [API Reference](/docs/Hooks/useWallet#getpublickey)


### [Deprecated] - wallet in useWallet

use `adapter` instead of `wallet` in `useWallet` hook. [API Reference](/docs/Hooks/useWallet#wallet)


### [Deprecated] - supportedWallets in useWallet
 
Removed. If you want to configure default wallets, check out [Here](/docs/tutorial/customize-wallet-list)

## For Wallet Developers

### [Major breaking change] - new wallet standard

The mysten wallet standard has been updated to version 0.5.0. 

So make sure your wallet adapter supports it, otherwise our kit will not detect your wallet as valid ones.

For more of integration details, check out [How to integrate with Suiet Kit?](/docs/CanIUse#how-to-integrate-with-suiet-kit)