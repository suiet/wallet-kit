import { getWallets } from "@mysten/wallet-standard";
import { SlushWallet, SLUSH_WALLET_NAME } from "@mysten/slush-wallet";
import {
  RegisterWalletCallbackExternal,
  RegisterWalletCallbackInput,
  UnregisterWalletCallback,
} from "../wallet";

export const registerSlushWallet: RegisterWalletCallbackExternal = (
  input: RegisterWalletCallbackInput,
): UnregisterWalletCallback => {
  const wallets = getWallets();
  const { appName, origin, network = "mainnet" } = input;
  const wallet = new SlushWallet({
    name: appName,
    origin: origin,
    chain: network === "mainnet" ? "sui:mainnet" : "sui:testnet",
    metadata: {
      id: "slush",
      walletName: SLUSH_WALLET_NAME,
      icon: "", // TODO: add icon
      enabled: true,
    },
  });

  const unregister = wallets.register(wallet);
  return unregister;
};
