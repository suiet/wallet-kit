import { useLayoutEffect } from "react";
import { registerStashedWallet } from "@suiet/wallet-sdk";

export function useInstallStashedWalletAdapter() {
  useLayoutEffect(() => {
    // register web wallets
    const config = {
      name: "Test Stashed",
      origin: undefined,
    };

    const { unregister } = registerStashedWallet(config.name, {
      origin: config.origin,
    });

    return () => {
      unregister();
    };
  }, []);
}
