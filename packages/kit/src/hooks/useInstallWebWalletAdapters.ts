import { useLayoutEffect } from "react";
import { IDefaultWallet, WalletType } from "@suiet/wallet-sdk";
import { isNonEmptyArray } from "../utils";

export function useInstallWebWalletAdapters(defaultWallets: IDefaultWallet[]) {
  useLayoutEffect(() => {
    const unregisterFunctions: (() => void)[] = [];

    if (isNonEmptyArray(defaultWallets)) {
      defaultWallets.forEach((item) => {
        if (
          item.type === WalletType.WEB &&
          item.downloadUrl?.registerWebWallet
        ) {
          const unregister = item.downloadUrl.registerWebWallet();
          unregisterFunctions.push(unregister);
        }
      });
    }

    return () => {
      if (!isNonEmptyArray(unregisterFunctions)) return;
      unregisterFunctions.forEach((unregister) => {
        unregister();
      });
    };
  }, [defaultWallets]);
}
