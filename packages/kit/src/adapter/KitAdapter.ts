import { WalletAdapter } from '@mysten/wallet-adapter-base';

interface KitAdapter<T> {
  adapter: T;
}

export interface Wallet<T extends WalletAdapter = WalletAdapter> {
  installed: boolean | undefined;
  name: string;
  group: string;
  iconUrl: string | (() => Promise<string>);
  downloadUrl?: {
    browserExtension?: string; // chrome default
  };
  createAdapter: () => KitAdapter<T>;
}

export type WalletList = {
  group: string;
  wallets: Wallet[];
}[];

export type WalletInstance = Omit<Wallet, 'createAdapter'> &
  ReturnType<Wallet['createAdapter']> & {
    index: number;
    group: string;
  };
