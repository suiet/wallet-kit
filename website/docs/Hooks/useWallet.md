---
sidebar_position: 1
---

# useWallet

## Description

 `useWallet` is the most useful React Hook to play with. For details of React Hook, check the [React doc](https://reactjs.org/docs/hooks-intro.html).

It retrieves all the properties and functions from [WalletProvider](/docs/components/walletprovider), with which you can get properties and call functions of a connected wallet.

:::tip

Make sure it runs in a React component under `WalletProvider`

:::

## Examples

### Basic Usage

We start with a simple senario like getting information from the connected wallet .

```jsx
import {useWallet} from '@suiet/wallet-kit'

function App() {
  const wallet = useWallet();
  console.log('wallet status', wallet.status)
  console.log('connected wallet name', wallet.name)
  console.log('connected account info', wallet.account)
}
```

### Sign and Execute Transactions

Sui defines many types of signable transaction, such as `moveCall`, `transferSui` etc.

>  For all the types of signable transaction, see [Sui official repo ](https://github.com/MystenLabs/sui/blob/e45b188a80a067700efdc5a099745f18e1f41aac/sdk/typescript/src/signers/txn-data-serializers/txn-data-serializer.ts#L98) 💡

Here we use `moveCall` type to implement a simple nft minting example, leveraging the [sample contract of Sui](https://examples.sui.io/samples/nft.html).

```jsx
import {useWallet} from '@suiet/wallet-kit'

function App() {
  const wallet = useWallet();
  
  async function handleSignAndExecuteTx() {
		if (!wallet.connected) return
    try {
      const resData = await wallet.signAndExecuteTransaction({
        transaction: {
          kind: 'moveCall',
          data: {
            packageObjectId: '0x2',
            module: 'devnet_nft',
            function: 'mint',
            typeArguments: [],
            arguments: [
              'name',
              'capy',
              'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop',
            ],
            gasBudget: 10000,
          }
        }
      });
      console.log('nft minted successfully!', resData);
      alert('congrats, a cute capybara comes to you!')
    } catch (e) {
      console.error('nft mint failed', e);
    }
  }
  
  return (
  	<...>
    	<button onClick={handleSignAndExecuteTx}>Mint Your NFT!</button>
    <.../>
  )
}
```

### Sign Message

:::caution

Since this is a experimental feature, not all the wallet has implemented. Check [Can I Use](/docs/CanIUse) for further information.

:::

[Message signing](https://en.bitcoin.it/wiki/Message_signing#:~:text=Message%20signing%20is%20the%20action,they%20correspond%20to%20each%20other.) is an important action to **verify whether an approval is confirmed by the owner of an account**.  

It is useful for DApp to ask user's approval for senarios like approving Terms of Service and Privacy Policy (Below is an example of message signing in OpenSea, the NFT marketplace in Ethereum)

![Example of message signing in the NFT marketplace OpenSea](/img/signmsg.png)

Here is an example for signing a simple message "Hello World". 

>  Notice that all the params are Uint8Array (i.e. bytes) type. For browser app, you can use [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) to encode and decode.

```tsx
import {useWallet} from '@suiet/wallet-kit'
import * as tweetnacl from 'tweetnacl'

function App() {
  const wallet = useWallet();
  
  async function handleSignMsg() {
    try {
      const msg = 'Hello world!'
      const result = await wallet.signMessage({
        message: new TextEncoder().encode(msg)
      })
      if (!result) return
      console.log('signMessage success', result)

      // you can use tweetnacl library 
      // to verify whether the signature matches the publicKey of the account.
			const isSignatureTrue = tweetnacl.sign.detached.verify(
        result.signedMessage,
        result.signature,
        wallet.account?.publicKey as Uint8Array,
      )
      console.log('verify signature with publicKey via tweetnacl', isSignatureTrue)
    } catch (e) {
      console.error('signMessage failed', e)
    }
  }
  
  return (
  	<...>
    	<button onClick={handleSignMsg}>Sign Message</button>
    <.../>
  )
}
```

### Add wallet event listener

:::caution

Since this is a experimental feature, not all the wallet has implemented. Check [Can I Use](/docs/CanIUse) for further information.

:::

You can listen to the event from wallet app, such as network switching, account switching. Take network switching event as an example:

```tsx
import {useWallet} from '@suiet/wallet-kit'
import * as tweetnacl from 'tweetnacl'

function App() {
  const wallet = useWallet();
  
  useEffect(() => {
    if (!wallet.connected) return;
    console.log('listen to chainChange event only')
    const off = wallet.on('chainChange', ({chain}) => {
      console.log('chainChange', chain)
    })
    return () => {
      off()
    }
  }, [wallet.connected])
}
```

## API References

### name

The name of connected wallet.

| Type                | Default   |
| ------------------- | --------- |
| string \| undefined | undefined |

### connection status

The connection status of wallet.

| Properties | Type                                             | Default        |
| ---------- | ------------------------------------------------ | -------------- |
| connecting | boolean                                          | false          |
| connected  | boolean                                          | false          |
| status     | 'disconnected' \| 'connecting' \| 'disconnected' | 'disconnected' |

```ts
const { status, connected, connecting } = useWallet();

// the assert expressions are equally the same
assert(status === 'disconnected', !connecting && !connected); // not connect to wallet
assert(status === 'connecting', connecting); // now connecting to the wallet
assert(status === 'connected', connected); // connected to the wallet
```

### account

The account info in the connected wallet, including address, publicKey etc.

| Type                            | Default   |
|---------------------------------| --------- |
| [WalletAccount](/docs/Types#WalletAccount) \ | undefined | undefined |

```ts
const { connected, account } = useWallet();

function printAccountInfo() {
  if (!connected) return
  console.log(account.address)
  console.log(account.publicKey)
}
```

### address

Alias for `account.address`

### select

| Type                         | Default |
| ---------------------------- | ------- |
| (WalletName: string) => void |         |

### getAccounts

Get all the accessible accounts returned by wallet.

| Type                    | Default |
| ----------------------- | ------- |
| () => Promise<string[]> |         |

The getAccounts will get the current wallet's account address. Now one wallet only have one account.

```jsx
import { useWallet } from '@suiet/wallet-kit';

function YourComponent() {
  const wallet = useWallet();
  
  function handleGetAccounts() {
    if (!wallet.connected) return
    getAccounts().then((accounts) => {
      console.log(accounts);
    })
  }
}
```

### adapter

The adapter normalized  from the raw adapter of the connected wallet. You can call all the properties and functions on it, which is followed the [@mysten/wallet-standard](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/packages/wallet-standard)

| Type                             | Default   |
|----------------------------------| --------- |
| [IWalletAdapter](/docs/Types#IWalletAdapter) | undefined | undefined |

### signAndExecuteTransaction

The universal function to send and execute transaction via connected wallet. For all the types of signable transaction, see [Sui official repo ](https://github.com/MystenLabs/sui/blob/e45b188a80a067700efdc5a099745f18e1f41aac/sdk/typescript/src/signers/txn-data-serializers/txn-data-serializer.ts#L98) 💡

| Type                                                         | Default |
| ------------------------------------------------------------ | ------- |
| `(transaction: SuiSignAndExecuteTransactionInput) => Promise<SuiSignAndExecuteTransactionOutput>` |         |

### signMessage

The function for message signing.

:::caution

Since this is a experimental feature, not all the wallet has implemented. Check [Can I Use](/docs/CanIUse) for further information.

:::

| Type                                                                                   | Default |
|----------------------------------------------------------------------------------------| ------- |
| `(input: {message: Uint8Array}) => Promise<{ signature: Uint8Array; signedMessage: Uint8Array}>` |         |

### on

The function for wallet event listening. Returns the off function to remove listener.

:::caution

Since this is a experimental feature, not all the wallet has implemented. Check [Can I Use](/docs/CanIUse) for further information.

:::

| Type                                                         | Default |
| ------------------------------------------------------------ | ------- |
| `<E extends WalletEvent>(event: E, listener: WalletEventListeners[E], ) => () => void;` |         |

All the wallet events:

| Event         | Listener                                                     | Description                                               |
| ------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| chainChange   | `(params: { chain: string }) => void;`                       | Emit when wallet app changes its network                  |
| accountChange | `(params: { account: WalletAccount; }) => void;`             | Emit when wallet app changes its account                  |
| featureChange | `(params: { features: string[]; }) => void;`                 | Emit when wallet app changes its wallet-standard features |
| change        | `(params: { chain?: string, account?: WalletAccount; features?: string[]; }) => void;` | Raw change event defined by wallet-standard               |

## Deprecated API

### wallet

:::caution
Deprecated, use [adapter](#adapter) instead.
:::

### getPublicKey

:::caution
Deprecated, use [account.publicKey](#account) instead.
:::

### executeMoveCall and executeSerializedMoveCall

:::caution
Deprecated, use [signAndExecuteTransaction](#) instead.
:::
