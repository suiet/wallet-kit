---
sidebar_position: 1
---

# useWallet

:::caution
When you use the useWallet hook, you must wrap your component into the WalletProvider component.
:::

## Introduction

The useWallet hook provides the ability to get the status of account, connect method and move call method.
You can use the hook and provider to connect wallet by your own button and modal.
The useWallet hook will return WalletContextState props.
For detail, you can check the doc https://kit.suiet.app/docs/components/walletprovider#walletcontextstate to get the api reference of WalletContextState.

```tsx
const {
  supportedWallets: WalletInstance[]; // all supported wallet list
  groupWallets: Record<string, WalletInstance[]>; // grouped wallet map, now include recent and popular group
  wallet: StandardWallet | null; // Wallet that we are currently connected to

  connecting: boolean;
  connected: boolean;
  address: string; // currently coonected account address
  status: 'disconnected' | 'connected' | 'connecting';

  select(walletName: string): void; // select which wallet to connect
  disconnect(): Promise<void>; // disconnect the connected wallet's connection

  getAccounts: () => Promise<SuiAddress[]>; // get all your wallets' accounts
  signAndExecuteTransaction(
    transaction: SignableTransaction
  ): Promise<SuiTransactionResponse>;

  signMessage: (input: SignMessageInput) => Promise<SignMessageOutput | null>;
  getPublicKey: () => Promise<Uint8Array>;
} = useWallet();
```

## API Reference

### supportedWallets

| Type             | Default |
| ---------------- | ------- |
| WalletInstance[] | []      |

The supportedWallets will return all the wallets you passed to the WalletProvider. You can check the doc https://kit.suiet.app/docs/components/WalletProvider#walletinstance to learn the wallet type. For example:

```jsx
import { getDefaultWallets, useWallet } from '@suiet/wallet-kit';
const supportedWallets = getDefaultWallets();

<WalletProvider supportedWallets={supportedWallets}>
  <YourComponent />
</WalletProvider>;

// in your component
function YourComponent() {
  const { supportedWallets } = useWallet(); // it's the same as the previous supportedWallets
}
```

### groupWallets

| Type                             | Default |
| -------------------------------- | ------- |
| Record<string, WalletInstance[]> | []      |

The groupWallets means the grouped wallets. It's like the below example. Generally you don't need to use it. You can check the doc https://kit.suiet.app/docs/components/WalletProvider#walletinstance to learn the wallet type.

```ts
const groupWallets = {
  popular: [SuietWallet()], // wallet list
  recent: [SuietWallet()], // wallet list
};
```

### wallet

| Type           | Default |
| -------------- | ------- |
| WalletInstance | []      |

The wallet is the currently selected wallet in the `supportedWallets`. You can check the doc https://kit.suiet.app/docs/components/WalletProvider#walletinstance to learn the wallet type.

### wallet status - connecting, connected, status

| Properties | Type                                             | Default        |
| ---------- | ------------------------------------------------ | -------------- |
| connecting | boolean                                          | false          |
| connected  | boolean                                          | false          |
| status     | 'disconnected' \| 'connecting' \| 'disconnected' | 'disconnected' |

The connecting, connected, and status are all related to the wallet's connection status. When connecting to wallet, the connecting will be true. And when connected to wallet, connected will be true. You can also just use status to know current connection status. Their relationship is as follows:

```js
import { getDefaultWallets, useWallet } from '@suiet/wallet-kit';

const { status, connected, connecting } = useWallet();

assert(status === 'disconnected', !connecting && !connected); // not connect to wallet
assert(status === 'connecting', connecting); // now connecting to the wallet
assert(status === 'connected', connected); // connected to the wallet
```

### address

| Type   | Default |
| ------ | ------- |
| string | ''      |

After you connect to the wallet, you can get the account address from `useWallet` hook. The address is just like `0x84bf9b49a3db40cb022c371af2ac6cb3017a712b`.

### select

| Type                         | Default |
| ---------------------------- | ------- |
| (WalletName: string) => void |         |

If you want to customize, it's useful to use select function. Now you can pass two kinds of WalletName: 'Suiet' or 'Sui Wallet'. And you can get wallet names from WalletNames constant. For example:

```jsx
// App.jsx
import { WalletProvider, getDefaultWallets, WalletNames } from '@suiet/wallet-kit';
function App() {
  return (
    const supportedWallets = getDefaultWallets();

    <WalletProvider supportedWallets={supportedWallets}>
      <YourComponent />
    </WalletProvider>;
  )
}
// YourComponent
import { getDefaultWallets, useWallet } from '@suiet/wallet-kit';

function YourComponent() {
  const { select } = useWallet();

  return (
    <YourButton onClick={() => {
      select(WalletNames.SUIET_WALLET) // = connect to suiet wallet
    }}>
      connect wallet
    </YourButton>
  )
}

```

### getAccounts

| Type                    | Default |
| ----------------------- | ------- |
| () => Promise<string[]> |         |

The getAccounts will get the current wallet's account address. Now one wallet only have one account.

```jsx
import { useWallet } from '@suiet/wallet-kit';

function YourComponent() {
  const { getAccounts, connected } = useWallet();

  useEffect(() => {
    if (connected) {
      getAccounts().then((accounts) => {
        console.log(accounts);
      });
    }
  }, [connected]);
}
```

### signAndExecuteTransaction

The signAndExecuteTransaction is a substitute for executeMoveCall and executeSerializedMoveCall hook. It recive two pramas - kind and data. The kind param is the type of transaction(moveCall, bytes and more). For example

```jsx
export function Transaction() {
  const { signAndExecuteTransaction } = useWallet();

  const handleClick = async () => {
    // the following example comes from sui wallet official example.
    await signAndExecuteTransaction({
        transaction:{
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
  };

  return <button onClick={() => handleClick()}>send transaction</button>;
}
```

### getPublicKey

| Type                        | Default      |
| --------------------------- | ------------ |
| `() => Promise<Uint8Array>` | Uint8Array[] |

In some case, you may need to get user's public key. Just use getPulicKey method. It will return the current account address's publicKey. But some wallet don't provide publickey, in this case, will return an empty Uint8Array.

```jsx
import { useWallet } from '@suiet/wallet-kit';

function YourComponent() {
  const { getPublicKey, connected } = useWallet();

  useEffect(() => {
    if (connected) {
      getPublicKey().then((key) => {
        console.log(key); // exmaple output: Uint8Array[112,33,44,11,...]
      });
    }
  }, [connected]);
}
```

If you want to convert Uint8Array to string, you need to use other library like borsh(https://www.npmjs.com/package/borsh).

### executeMoveCall and executeSerializedMoveCall

:::caution
has been removed, use `signAndExecuteTransaction` instead.
:::
