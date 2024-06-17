import { Wallet } from "@mysten/wallet-standard";
import { FeatureName } from "./constants";

export function isStandardWalletAdapterCompatibleWallet(wallet: Wallet) {
  const res =
    FeatureName.STANDARD__CONNECT in wallet.features &&
    FeatureName.STANDARD__EVENTS in wallet.features &&
    (FeatureName.SUI__SIGN_TRANSACTION in wallet.features ||
      FeatureName.SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK in wallet.features);
  return res;
}
