import {useEffect, useRef} from "react";
import {isNonEmptyArray} from "../utils";
import {ConnectionStatus, IWallet} from "../types";
import {Storage} from "../utils/storage";
import {StorageKey} from "../constants/storage";

export function useAutoConnect(
  select: (name: string) => Promise<void>,
  status: ConnectionStatus,
  allAvailableWallets: IWallet[],
  autoConnect: boolean,
) {
  const init = useRef(false)

  // auto connect
  useEffect(() => {
    if (!autoConnect ||
      init.current ||
      !isNonEmptyArray(allAvailableWallets) ||
      status !== ConnectionStatus.DISCONNECTED
    ) return

    const storage = new Storage()
    const lastConnectedWalletName = storage.getItem(StorageKey.LAST_CONNECT_WALLET_NAME)
    if (!lastConnectedWalletName) return

    if (allAvailableWallets.find(item => item.name == lastConnectedWalletName)) {
      console.log('auto connect to wallet:', lastConnectedWalletName)
      select(lastConnectedWalletName)
        .then(() => {
          init.current = true
        })
    }
  }, [allAvailableWallets])
}