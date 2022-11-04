import {useEffect, useRef, useState} from "react";
import {DEPRECATED_getWallets, Wallet, Wallets} from '@wallet-standard/core'
import {IWalletAdapter} from "../types/wallet";
import {WalletAdapter} from "../wallet/wallet-adapter";
import {isEmpty} from "lodash-es";

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 */
export function useWalletAdapterDetection() {
  const standardWalletManager = useRef<Wallets>()
  // normalized adapters
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<IWalletAdapter[]>([])
  console.log('availableWalletAdapters', availableWalletAdapters)

  useEffect(() => {
    standardWalletManager.current = DEPRECATED_getWallets();
    const initWalletAdapters = standardWalletManager.current.get()

    if (!isEmpty(initWalletAdapters)) {
      setAvailableWalletAdapters(initWalletAdapters.map((wallet => new WalletAdapter(wallet))))
    }
    const clearListeners = standardWalletManager.current.on('register', (...wallets: Wallet[]) => {
      // normalize to WalletAdapter
      setAvailableWalletAdapters(wallets.map((wallet => new WalletAdapter(wallet))))
    })
    return () => {
      clearListeners()
    }
  }, [])

  return {
    availableWalletAdapters,
  }
}