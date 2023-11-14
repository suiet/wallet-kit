---
title: Can I Use - Adapter Capabilities
sidebar_position: 3
---

## Preset Wallets

These preset wallets will be displayed as `Popular` on our kit modal by default.

> If you are a wallet developer and want to list your wallet below, feel free to contact our team 🥳 [Twitter@suiet_wallet](https://twitter.com/suiet_wallet)

- [Suiet Wallet](https://chrome.google.com/webstore/detail/suiet/khpkpbbcccdmmclmpigdgddabeilkdpd)
- [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)
- [Ethos Wallet](https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli)
- [Martian Wallet](https://chrome.google.com/webstore/detail/martian-wallet-aptos-sui/efbglgofoippbgcjepnhiblaibcnclgk)
- [Surf Wallet](https://chrome.google.com/webstore/detail/surf-sui-wallet/emeeapjkbcbpbpgaagfchmcgglmebnen)
- [Glass Wallet](https://chrome.google.com/webstore/detail/glass-wallet-sui-wallet/loinekcabhlmhjjbocijdoimmejangoa)
- [Morphis Wallet](https://chrome.google.com/webstore/detail/morphis-wallet/heefohaffomkkkphnlpohglngmbcclhi)
- [OneKey Wallet](https://chrome.google.com/webstore/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj)
- [BitKeep Wallet](https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak/related)

## For Dapp Developers

### Can I Use with xxx Wallet?

Due to the adapter difference of each wallet, we present a function comparison table among wallet adapters.

:::info
Due to the presense of new [@mysten/wallet-standard (v0.5.0)](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/wallet-standard),
we are working on updating the statistics. Please stay tuned 🥳
:::

:::tip
Remember to handle exceptional cases if some wallet adapters do not support certain features.
:::

### Hook `useWallet`

|wallet|signAndExecuteTransactionBlock| signPersonalMessage |chain|account.publicKey|
|:-:|:-:|:-------------------:|:-:|:-:|
|[Suiet Wallet](https://suiet.app/)|✅|          ✅          |✅|✅|
|[Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)|✅|          ✅          |✅|❌|
|[Ethos Wallet](https://ethoswallet.xyz/)|✅|          ✅          |❌|❌|


## For Wallet Developers

### How to integrate with Suiet Kit?

Please make sure your wallet supports the [@mysten/wallet-standard](https://github.com/MystenLabs/sui/tree/main/sdk/wallet-adapter/wallet-standard) v0.5.0 and above.

Specifically, in order to be auto-detected and recognized as a standard wallet on Sui by our kit, 
you need to implement the following features in your wallet adapter:

```js
// a valid wallet adapter should have the following features
{
  // ...
  features: {
    "standard:connect": () => {},
    "standard:events": () => {},
    "sui:signAndExecuteTransactionBlock": () => {},
  }
}
```

### How to list my wallet on Suiet Kit?

You can contact our team via [Twitter@suiet_wallet](https://twitter.com/suiet_wallet) to list your wallet on Suiet Kit.

Or submit a PR to our [repo](https://github.com/suiet/wallet-kit/pulls), modify the following files:

```ts
// packages/kit/src/wallet/preset-wallets/presets.ts
export enum PresetWallet {
  // ... resgisted wallet enum
  // note that this name should match with your wallet adapter's name 
  // for auto detection and display purposes
  YOUR_WALLET = "Your Wallet",
}

export const YourWallet = defineWallet({
  name: PresetWallet.YOUR_WALLET,
  iconUrl: 'base64 encoded image (recommended, optimize the size!!) / external url',
  downloadUrl: {
    browserExtension: 'chrome extension installation url',
  }
})
```

```ts
// packages/kit/src/wallet/preset-wallets/index.ts
export const AllDefaultWallets = [
    ...[
        // ... registed wallets
        presets.YourWallet,
    ].sort((a, b) => a.name < b.name ? -1 : 1),
]
```
