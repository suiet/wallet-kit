import { useEffect, useState } from 'react';
import { WalletContainer } from '../standard/WalletsContainer';

export function useAdapters(adapterProvider: WalletContainer) {
  const [wallets, setWallets] = useState(() => adapterProvider.get());

  useEffect(() => {
    setWallets(adapterProvider.get());
    const unsubcribe = adapterProvider.on('changed', () => {
      window.console.log('wallet changed', adapterProvider.get());
      setWallets(adapterProvider.get());
    });

    return () => {
      unsubcribe();
    };
  }, [adapterProvider]);

  return wallets;
}
