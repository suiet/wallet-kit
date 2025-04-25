import { getWallets } from "@mysten/wallet-standard";
import { SlushWallet } from "@mysten/slush-wallet";
import {
  RegisterWalletCallbackExternal,
  RegisterWalletCallbackInput,
  UnregisterWalletCallback,
} from "../wallet";

export const registerSlushWallet: RegisterWalletCallbackExternal = (
  input: RegisterWalletCallbackInput
): UnregisterWalletCallback => {
  const wallets = getWallets();
  const { appName, origin, network = "mainnet" } = input;
  const wallet = new SlushWallet({
    name: appName,
    origin: origin,
    chain: `sui:${network}`,
    metadata: {
      id: 'slush-wallet',
      walletName: appName,
      icon: '',
      enabled: true
    }
  });

  const unregister = wallets.register(wallet);
  return unregister;
};
