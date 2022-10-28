import { WalletNames } from '../../constants/wallet';
import { Wallet } from '../KitAdapter';
import logo from './logo.svg';

export const sui = (): Wallet => {
  return {
    name: WalletNames.SUI_WALLET,
    iconUrl: logo,
    installed:
      typeof window !== 'undefined' &&
      typeof (window as any).suiWallet !== 'undefined',
    downloadUrl: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil',
    },
  };
};
