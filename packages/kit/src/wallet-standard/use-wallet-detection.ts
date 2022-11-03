import {useEffect, useRef, useState} from "react";
import {DEPRECATED_getWallets, Wallet} from '@wallet-standard/core'
import {IWalletAdapter} from "../types/wallet";
import {WalletAdapter} from "../wallet/wallet-adapter";

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 */
export function useWalletAdapterDetection() {
  const standardWalletManager = useRef(DEPRECATED_getWallets())
  // normalized adapters
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<IWalletAdapter[]>([])
  console.log('availableWalletAdapters', availableWalletAdapters)

  function normalizeWalletAdapter(adapter: Wallet) {
    return new WalletAdapter(adapter)
  }

  useEffect(() => {
    const initWalletAdapters = standardWalletManager.current.get()
    console.log('initWalletAdapters', initWalletAdapters)

    const clearListeners = standardWalletManager.current.on('register', (...wallets: Wallet[]) => {
      setAvailableWalletAdapters(wallets.map(normalizeWalletAdapter))
    })
    return () => {
      clearListeners()
    }
  }, [])

  return {
    availableWalletAdapters,
  }
}