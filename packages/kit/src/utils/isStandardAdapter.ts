import { StandardWalletAdapter } from '../standard/WalletStandard';

export function isStandardAdapter(
  adapter: any
): adapter is StandardWalletAdapter {
  return typeof adapter.publicKey !== 'undefined';
}
