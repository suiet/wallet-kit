import { useEffect, useRef, useState } from "react";
import { IWalletAdapter, IWalletRadar, WalletRadar } from "@suiet/wallet-sdk";

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 * Notice: call once only in provider, cuz there is event registration
 */
export function useWalletAdapterDetection() {
  const walletRadar = useRef<IWalletRadar>();
  // normalized adapters
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<
    IWalletAdapter[]
  >([]);
  console.log("--availableWalletAdapters", availableWalletAdapters);

  useEffect(() => {
    if (!walletRadar.current) {
      walletRadar.current = new WalletRadar();
      walletRadar.current.activate();
    }

    const initialWalletAdapters =
      walletRadar.current.getDetectedWalletAdapters();
    setAvailableWalletAdapters(initialWalletAdapters);

    return () => {
      if (walletRadar.current) {
        walletRadar.current.deactivate();
      }
    };
  }, []);

  return {
    data: availableWalletAdapters,
  };
}
