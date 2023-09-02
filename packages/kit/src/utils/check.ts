import {Wallet} from "@mysten/wallet-standard";

export function isNonEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

export function isStandardWalletAdapterCompatibleWallet(
  wallet: Wallet
) {
  return (
    "standard:connect" in wallet.features &&
    "standard:events" in wallet.features &&
    "sui:signAndExecuteTransactionBlock" in wallet.features
  );
}
