import { StandardWallet } from '../standard/WalletStandard';

export function isStandardWalletAdapterCompatibleWallet(
  wallet: any
): wallet is StandardWallet {
  return (
    'standard:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'sui:signAndExecuteTransaction' in wallet.features
  );
}
