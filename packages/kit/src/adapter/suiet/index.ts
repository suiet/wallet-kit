import { SuietWalletAdapter } from '@suiet/wallet-adapter';
import { WalletNames } from '../../constants/wallet';
import { Wallet } from '../KitAdapter';
import logo from './logo.svg';

export const suiet = (): Wallet => {
  return {
    name: WalletNames.SUIET_WALLET,
    iconUrl: logo,
    installed:
      typeof window !== 'undefined' &&
      typeof (window as any).__suiet__ !== 'undefined',
    createAdapter: () => {
      return {
        adapter: new SuietWalletAdapter(),
      };
    },
    downloadUrl: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/suiet/khpkpbbcccdmmclmpigdgddabeilkdpd',
    },
  };
};
