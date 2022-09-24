import { SuiWalletAdapter } from '@mysten/wallet-adapter-sui-wallet';
import { Wallet } from '../KitAdapter';
import logo from './logo.png';

export const sui = (): Wallet => {
  return {
    name: 'Sui Wallet',
    iconUrl: logo,
    installed:
      typeof window !== 'undefined' &&
      typeof (window as any).suiWallet !== 'undefined',
    createAdapter: () => {
      return {
        adapter: new SuiWalletAdapter(),
      };
    },
  };
};
