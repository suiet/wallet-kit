import {
  resolveAdapters,
  WalletAdapterProvider,
} from '@mysten/wallet-adapter-base';
import { useEffect, useState } from 'react';

export function useAdapters(adapterProvider: WalletAdapterProvider[]) {
  const [wallets, setWallets] = useState(() =>
    resolveAdapters(adapterProvider)
  );

  useEffect(() => {
    if (adapterProvider.length < 0) return;

    const unsubcribes = adapterProvider.map((provider) => {
      const unsubcribe = provider.on('changed', () => {
        setWallets(resolveAdapters(adapterProvider));
      });

      return unsubcribe;
    });

    return () => {
      unsubcribes.forEach((unsubcribe) => unsubcribe());
    };
  }, [adapterProvider]);

  return wallets;
}
