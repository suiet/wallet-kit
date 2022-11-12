import {useEffect, useRef, useState} from "react";
import {DEPRECATED_getWallets, Wallet, Wallets} from '@wallet-standard/core'
import {IWalletAdapter} from "../types/wallet";
import {WalletAdapter} from "../wallet/wallet-adapter";
import {isNonEmptyArray, isStandardWalletAdapterCompatibleWallet} from "../utils";

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 * Notice: call once only in provider, cuz there is event registration
 */
export function useWalletAdapterDetection() {
  const standardWalletManager = useRef<Wallets>()
  // normalized adapters
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<IWalletAdapter[]>([])
  console.log('availableWalletAdapters', availableWalletAdapters)

  useEffect(() => {
    standardWalletManager.current = DEPRECATED_getWallets();
    const initWalletAdapters = standardWalletManager.current.get()

    if (isNonEmptyArray(initWalletAdapters)) {
      setAvailableWalletAdapters(initWalletAdapters.map((wallet => new WalletAdapter(wallet))))
    }

    const clearListeners = standardWalletManager.current.on('register', (...newAdapters: Wallet[]) => {
      if (!standardWalletManager.current) return;
      const initWalletAdapters = standardWalletManager.current.get()
      const allAdapters = [...initWalletAdapters]
      // filter out duplicate & not standard sui adapters & merged into existed list
      newAdapters
        .filter(newAdapter => !allAdapters.find(existAdapter => existAdapter.name === newAdapter.name))
        .filter(newAdapter => isStandardWalletAdapterCompatibleWallet(newAdapter))
        .forEach(newAdapter => {
          allAdapters.push(newAdapter)
        })
      // normalize adapters
      setAvailableWalletAdapters(allAdapters.map((wallet => new WalletAdapter(wallet))))
    })
    return () => {
      clearListeners()
    }
  }, [])

  return {
    data: availableWalletAdapters,
  }
}