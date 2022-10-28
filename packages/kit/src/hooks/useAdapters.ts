import { useEffect, useState } from 'react';
import { WalletContainer } from '../standard/WalletsContainer';

export function useAdapters(adapterProvider: WalletContainer) {
  const [wallets, setWallets] = useState(() => adapterProvider.get());

  useEffect(() => {
    const unsubcribe = adapterProvider.on('changed', () => {
      setWallets(adapterProvider.get());
    });

    return () => {
      unsubcribe();
    };
  }, [adapterProvider]);

  return wallets;
}
