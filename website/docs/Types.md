---
title: Types
sidebar_position: 999
---

## Types of Sui SDK

https://github.com/MystenLabs/sui/tree/main/sdk/typescript/src/types

## IDefaultWallet

```typescript
export interface IDefaultWallet {
  name: string;  // wallet name
  iconUrl: string;  // wallet icon url (external url or data url)
  downloadUrl: {
    browserExtension?: string;  // provide download link if this wallet is not installed
  };
}
```

example for customized defaultWallet item: 

```typescript
import IDefaultWallet from '@suiet/wallet-kit';

const myWallet: IDefaultWallet = {
  name: "myWallet",
  iconUrl: "external url or data url",
  downloadUrl: {
    browserExtension: 'chrome extension store url...'
  },
}
```

## WalletAccount

```ts
export interface WalletAccount {
    /** Address of the account, corresponding with the public key. */
    readonly address: string;

    /** Public key of the account, corresponding with the secret key to sign, encrypt, or decrypt using. */
    readonly publicKey: Uint8Array;

    /** Chains supported by the account. */
    readonly chains: IdentifierArray;

    /** Features supported by the account. */
    readonly features: IdentifierArray;

    /** Optional user-friendly descriptive label or name for the account, to be displayed by apps. */
    readonly label?: string;

    /** Optional user-friendly icon for the account, to be displayed by apps. */
    readonly icon?: WalletIcon;
}
```

## IWalletAdapter

https://github.com/suiet/wallet-kit/blob/main/packages/kit/src/types/wallet.ts#L39



