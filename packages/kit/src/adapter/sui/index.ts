import { SuiWalletAdapter } from '@mysten/wallet-adapter-sui-wallet';
import { Wallet } from '../KitAdapter';

export const sui = (): Wallet => {
  return {
    name: 'Sui Wallet',
    group: 'Popular',
    iconUrl: '',
    installed:
      typeof window !== 'undefined' &&
      typeof (window as any).suiWallet !== undefined,
    createAdapter: () => {
      return {
        adapter: new SuiWalletAdapter(),
      };
    },
  };
};
