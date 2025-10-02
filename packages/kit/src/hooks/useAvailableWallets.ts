import { useMemo } from "react";
import { isNonEmptyArray } from "../utils";
import { useWalletAdapterDetection } from "./useWalletDetection";
import { IDefaultWallet, IWallet, IWalletAdapter } from "@suiet/wallet-sdk";
import { useInstallWebWalletAdapters } from "./useInstallWebWalletAdapters";

export const useAvailableWallets = (defaultWallets: IDefaultWallet[]) => {
  useInstallWebWalletAdapters(defaultWallets);
  const { data: availableWalletAdapters } = useWalletAdapterDetection();

  const doesAdapterMatchDefaultWallet = (defaultWallet: IDefaultWallet, detectedWalletAdapter: IWalletAdapter) => {
    // use id as a higher priority to find adapter
    // if id not found, then use name
    if (detectedWalletAdapter?.id && detectedWalletAdapter.id === defaultWallet?.id) {
      return true;
    }
    // Compatible slush/sui wallet (Slush — A Sui Wallet)
    if (defaultWallet?.name && detectedWalletAdapter?.name && defaultWallet.name.includes(detectedWalletAdapter.name)) {
      return true;
    }
    return false;
  };
  // configured wallets
  const configuredWallets: IWallet[] = useMemo(() => {
    if (!isNonEmptyArray(defaultWallets)) return [];
    if (!isNonEmptyArray(availableWalletAdapters)) {
      return defaultWallets.map(
        (item) =>
          ({
            ...item,
            adapter: undefined,
            installed: false,
          } as IWallet)
      );
    }

    return defaultWallets.map((item) => {
      const foundAdapter = availableWalletAdapters.find(
        (walletAdapter) => doesAdapterMatchDefaultWallet(item, walletAdapter)
      );
      if (foundAdapter) {
        return {
          ...item,
          adapter: foundAdapter,
          installed: true,
        } as IWallet;
      }
      return {
        ...item,
        adapter: undefined,
        installed: false,
      } as IWallet;
    });
  }, [defaultWallets, availableWalletAdapters]);

  // detected wallets
  const detectedWallets: IWallet[] = useMemo(() => {
    if (!isNonEmptyArray(availableWalletAdapters)) return [];
    return availableWalletAdapters
      .filter((adapter) => {
        // filter adapters not shown in the configured list
        return !defaultWallets.find((wallet) => wallet.name === adapter.name);
      })
      .map((adapter) => {
        // normalized detected adapter to IWallet
        return {
          name: adapter.name,
          label: adapter.name,
          adapter: adapter,
          installed: true,
          iconUrl: adapter.icon,
          downloadUrl: {
            browserExtension: "", // no need to know
          },
        };
      });
  }, [defaultWallets, availableWalletAdapters]);

  // filter installed wallets
  const allAvailableWallets: IWallet[] = useMemo(() => {
    return [...configuredWallets, ...detectedWallets].filter(
      (wallet) => wallet.installed
    );
  }, [configuredWallets, detectedWallets]);

  return {
    allAvailableWallets,
    configuredWallets,
    detectedWallets,
  };
};
