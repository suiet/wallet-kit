import {useEffect, useRef, useState} from "react";
import {getWallets, Wallet, Wallets} from '@wallet-standard/core'
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
  // console.log('availableWalletAdapters', availableWalletAdapters)

  function getInitStandardWalletAdapters(): Wallet[] {
    if (!standardWalletManager.current) return [];
    const initWalletAdapters = standardWalletManager.current.get()
    return initWalletAdapters.filter(isStandardWalletAdapterCompatibleWallet)
  }

  useEffect(() => {
    standardWalletManager.current = getWallets();
    const initWalletAdapters = getInitStandardWalletAdapters();
    console.log('initWalletAdapters', initWalletAdapters)

    if (isNonEmptyArray(initWalletAdapters)) {
      setAvailableWalletAdapters(initWalletAdapters
        .map((newAdapter => new WalletAdapter(newAdapter)))
      )
    }

    const clearListeners = standardWalletManager.current.on('register', (...newAdapters: Wallet[]) => {
      console.log('register newAdapters', newAdapters)
      if (!standardWalletManager.current) return;
      const initWalletAdapters = getInitStandardWalletAdapters();
      const allAdapters = [...initWalletAdapters]
      // filter out duplicate & not standard sui adapters & merged into existed list
      newAdapters
        .filter(isStandardWalletAdapterCompatibleWallet)
        .filter(newAdapter => !allAdapters.find(existAdapter => existAdapter.name === newAdapter.name))
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