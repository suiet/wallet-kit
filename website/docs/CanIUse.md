---
title: Can I Use - Adapter Capabilities
sidebar_position: 3
---

Due to the adapter difference of each wallet, we present a function comparison table among wallet adapters.

> ⚠️ Remember to handle exceptional cases if some wallet adapters do not support certain features.

## Hook `useWallet`

|Property|description|[Suiet Wallet](https://github.com/suiet/wallet-adapter)|[Sui Wallet](https://github.com/MystenLabs/sui/blob/main/sdk/wallet-adapter/packages/adapters/sui-wallet/src/adapter.ts)|[Ethos Wallet](https://ethoswallet.xyz/)|[Wave Wallet](https://www.wavewallet.app/)|[Hydro Wallet](https://hydro.tech/)|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|name|connected wallet's name|✅|✅|Not published|Not published|Not published|
|connected|wallet connected status|✅|✅|Not published|Not published|Not published|
|connecting|wallet connecting status|✅|✅|Not published|Not published|Not published|
|select|function that connects to the wallet|✅|✅|Not published|Not published|Not published|
|disconnect|function that disconnects current wallet|✅|✅|Not published|Not published|Not published|
|getAccounts|function that gets accounts info from current wallet|✅|✅|Not published|Not published|Not published|
|executeMoveCall|function that executes move-calls via wallet|✅|✅|Not published|Not published|Not published|
|executeSerializedMoveCall|function that executes serialized move-calls via wallet|✅|✅|Not published|Not published|Not published|
|signMessage|function that requests message signing from users|✅|❌|Not published|Not published|Not published|