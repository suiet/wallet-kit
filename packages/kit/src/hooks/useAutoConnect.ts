import {useEffect, useRef} from "react";
import {isNonEmptyArray} from "../utils";
import {IWallet} from "../types";
import {Storage} from "../utils/storage";
import {StorageKey} from "../constants/storage";

export function useAutoConnect(
  select: (name: string) => Promise<void>,
  allAvailableWallets: IWallet[],
  autoConnect: boolean,
) {
  const init = useRef(false)
  const storage = useRef(new Storage())

  // auto connect
  useEffect(() => {
    if (!autoConnect ||
      init.current ||
      !isNonEmptyArray(allAvailableWallets)
    ) return

    const lastConnectedWalletName = storage.current.getItem(StorageKey.LAST_CONNECT_WALLET_NAME)
    if (!lastConnectedWalletName) return

    if (allAvailableWallets.find(item => item.name == lastConnectedWalletName)) {
      select(lastConnectedWalletName)
      init.current = true
    }
  }, [allAvailableWallets])
}