import { getWallets } from "@mysten/wallet-standard";
import { StashedWallet } from "@mysten/zksend";
import {
  RegisterWalletCallbackExternal,
  RegisterWalletCallbackInput,
  UnregisterWalletCallback,
} from "../wallet";

export const registerStashedWallet: RegisterWalletCallbackExternal = (
  input: RegisterWalletCallbackInput
): UnregisterWalletCallback => {
  const wallets = getWallets();
  const wallet = new StashedWallet({
    name: input.appName,
    origin: input.origin,
  });

  const unregister = wallets.register(wallet);
  return unregister;
};
