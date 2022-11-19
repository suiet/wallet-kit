---
title: Can I Use - Adapter Capabilities
sidebar_position: 3
---

## Preset Wallets

These preset wallets will be displayed as `Popular` on our kit modal by default.

> If you are a wallet developer and want to list your wallet below, feel free to contact our team 🥳 [Twitter@suiet_wallet](https://twitter.com/suiet_wallet)

- [Suiet Wallet](https://suiet.app/)
- [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)
- [Ethos Wallet](https://ethoswallet.xyz/)

## Can I Use with xxx Wallet?

Due to the adapter difference of each wallet, we present a function comparison table among wallet adapters.

> ⚠️ Remember to handle exceptional cases if some wallet adapters do not support certain features.

### Hook `useWallet`

|wallet|name|connected|connecting|select|disconnect|getAccounts|getPublicKey|signMessage|executeMoveCall|executeSerializedMoveCall|signAndExecuteTransaction|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|---|
|[Suiet Wallet](https://suiet.app/)|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|
|[Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)|✅|✅|✅|✅|✅|✅|❌|❌|✅|✅|✅|
|[Ethos Wallet](https://ethoswallet.xyz/)|✅|✅|✅|✅|✅|✅|❌|❌|✅|✅|✅|
|[Wave Wallet](https://www.wavewallet.app/) (Not Published)|/|/|/|/|/|/|/|/|/|/||
|[Morphis Wallet](https://morphiswallet.com/) (Not Published)|/|/|/|/|/|/|/|/|/|/||