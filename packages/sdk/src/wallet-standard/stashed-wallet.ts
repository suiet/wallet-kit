import { getWallets } from "@mysten/wallet-standard";
import { StashedWallet } from "@mysten/zksend";

export function registerStashedWallet(
  name: string,
  {
    origin,
  }: {
    origin?: string;
  }
) {
  const wallets = getWallets();
  const wallet = new StashedWallet({
    name,
    origin,
  });

  const unregister = wallets.register(wallet);
  return {
    wallet,
    unregister,
  };
}
