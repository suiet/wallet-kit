---
sidebar_position: 1
---

# Upgrade to v0.3.5

Hi developers, new upgrade is coming 📣 We are proud to announce the Suiet Wallet Kit v0.3.5 release 🥳

Due to Sui Wallet's rebranding (Sui Wallet is now Slush Wallet and Stashed Web Wallet is now Slush Web Wallet), we are upgrading the Suiet Wallet Kit for DApps to catch up with these upgrades.

With the new wallet kit, your dapp can interact with all wallets in the Sui ecosystem via the latest wallet standard. Additionally, there are some breaking changes incurred by the upgrade of Sui Typescript SDK, please read the [migration section](/docs/migration/upgradeTo0.3.5#for-dapp-developers) for instructions.

## For Dapp Developers

### [New feature] - Sui Wallet Rebranding to Slush Wallet

Sui has rebranded their wallets:
- Sui Wallet extension is now Slush Wallet
- Stashed Web Wallet is now Slush Web Wallet

The wallet kit has been updated to reflect these changes with:
- Wallet presets now include Slush Wallet option
- A new hook `useSlushWallet` is added for Slush web wallet registration


### [Deprecated] - useStashedWallet

The `useStashedWallet` hook has been deprecated and replaced with `useSlushWallet` due to the rebranding of Stashed Wallet to Slush Web Wallet.
