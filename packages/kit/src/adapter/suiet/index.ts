import { SuietWalletAdapter } from '@suiet/wallet-adapter';
import { Wallet } from '../KitAdapter';

export const suiet = (): Wallet => {
  return {
    name: 'Suiet Wallet',
    group: 'Popular',
    iconUrl: '',
    installed:
      typeof window !== 'undefined' &&
      typeof (window as any).__suiet__ !== undefined,
    createAdapter: () => {
      return {
        adapter: new SuietWalletAdapter(),
      };
    },
  };
};
