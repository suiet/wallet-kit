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
  const { appName, origin, network = "mainnet" } = input;
  const wallet = new StashedWallet({
    name: appName,
    origin: origin,
    network: network,
  });

  const unregister = wallets.register(wallet);
  return unregister;
};
