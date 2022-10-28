---
title: Can I Use - Adapter Capabilities
sidebar_position: 3
---

Due to the adapter difference of each wallet, we present a function comparison table among wallet adapters.

> ⚠️ Remember to handle exceptional cases if some wallet adapters do not support certain features.

## Hook `useWallet`

|wallet|name|connected|connecting|select|disconnect|getAccounts|getPublicKey|signMessage|executeMoveCall|executeSerializedMoveCall|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|[Suiet Wallet](https://github.com/suiet/wallet-adapter)|✅|✅|✅|✅|✅|✅|✅|✅|✅|✅|
|[Sui Wallet](https://github.com/MystenLabs/sui/blob/main/sdk/wallet-adapter/packages/adapters/sui-wallet/src/adapter.ts)|✅|✅|✅|✅|✅|✅|✅|❌|✅|✅|
|[Ethos Wallet](https://ethoswallet.xyz/)|✅|✅|✅|✅|✅|✅|✅|❌|✅|✅|
|[Wave Wallet](https://www.wavewallet.app/) (Not Published)|/|/|/|/|/|/|/|/|/|/|
|[Hydro Wallet](https://hydro.tech/) (Not Published)|/|/|/|/|/|/|/|/|/|/|
|[Morphis Wallet](https://twitter.com/morphis_wallet) (Not Published)|/|/|/|/|/|/|/|/|/|/|