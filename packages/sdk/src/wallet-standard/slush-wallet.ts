import { getWallets } from "@mysten/wallet-standard";
import { SLUSH_WALLET_NAME, SlushWallet } from "@mysten/slush-wallet";
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
      id: 'slush-web-wallet',
      walletName: SLUSH_WALLET_NAME,
      icon: '',
      enabled: true
    }
  });

  const unregister = wallets.register(wallet);
  return unregister;
};
