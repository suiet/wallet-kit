import {useEffect, useRef, useState} from 'react';
import {StandardWalletAdapter} from "../standard/WalletStandard";
import {WalletContainer} from "../standard/WalletsContainer";

export function useAdapters() {
  const adapterProvider = useRef<WalletContainer>()
  const [wallets, setWallets] = useState<StandardWalletAdapter[]>([]);

  useEffect(() => {
    adapterProvider.current = new WalletContainer();
    setWallets(adapterProvider.current.get());
    const unsubscribe = adapterProvider.current.on('changed', (wallets) => {
      if (!adapterProvider.current) return;
      setWallets(adapterProvider.current.get());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return wallets;
}
