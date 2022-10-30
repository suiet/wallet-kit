---
sidebar_position: 3
---

# useSuiProvider

## Introduction

This hook is used to provide the Sui `JsonRpcProvider` interface in React Hooks style.

See [`@mysten/sui.js` package on npm](https://www.npmjs.com/package/@mysten/sui.js) or [Sui JSON-RPC](https://docs.sui.io/sui-jsonrpc) for more information.

:::tip
This hook is internally **JUST** importing the `JsonRpcProvider` interface and **implemention** from [`@mysten/sui.js` package](https://www.npmjs.com/package/@mysten/sui.js). What we do is caring about versioning, state management, and other stuffs for you.
:::

```jsx
function YourComponent() {
  const {
    getObjectsOwnedByAddress,
    getEventsByTransaction,
    getEventsBySender,

    // ... other methods
  } = useSuiProvider();

  return <>...</>;
}
```

## JsonRpcProvider vs Sui JSON-RPC

The `JsonRpcProvider` interface provided by [`@mysten/sui.js` package on npm](https://www.npmjs.com/package/@mysten/sui.js) is a thin wrapper around the [Sui JSON-RPC](https://docs.sui.io/sui-jsonrpc) API. It can be used to interact with the Sui blockchain. **Additionally, it provides many useful methods and typings to give you better developer experience.**

### Using cURL to call Sui JSON-RPC

Sui JSON-RPC defines a low-level API to interact with the Sui blockchain. In order to call this RPC, you need to know the RPC endpoint and the RPC method detials (request and response). For example, to call the `sui_executeTransaction` method, you need to write the following code:

:::caution
The code below is from [Sui JSON-RPC on GitHub](https://github.com/MystenLabs/sui/blob/main/doc/src/build/json-rpc.md).

For demonstration purpose, we use cURL to call the RPC. You can use any HTTP client to call the RPC.
:::

```bash
curl --location --request POST https://fullnode.devnet.sui.io:443 \
--header 'Content-Type: application/json' \
--data-raw '{ "jsonrpc": "2.0",
              "method": "sui_executeTransaction",
              "params": [{
                  "tx_bytes": "{{tx_bytes}}",
                  "signature": "{{signature}}",
                  "pub_key": "{{pub_key}}"}],
              "id": 1}'

```

### Using the JsonRpcProvider interface

But if you use the `JsonRpcProvider` provided by `useSuiProvider`, you can call the `sui_executeTransaction` RPC in a more convenient way:

```jsx
function YourComponent() {
  const { executeTransaction } = useSuiProvider();

  return (
    <div
      onClick={async () => {
        // ... some code to get the tx_bytes, signature, and pub_key
        const resp = await executeTransaction(txnBytes, signatureScheme, signature, pubkey);
        // resp is the response from the RPC, and has detailed typings defination
      }}
    >...</>
  );
}
```
