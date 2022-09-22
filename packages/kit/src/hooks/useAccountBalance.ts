import { Token } from '../constants/token';
import { NetworkType } from '../core/types/network';
import { useWallet } from './useWallet';
import { useCoinBalance } from './useCoinBalance';

export enum CoinSymbol {
  SUI = 'SUI',
}

export function useAccountBalance(token = Token.SUI) {
  const { address } = useWallet();
  const { error, loading, getBalance } = useCoinBalance({
    address,
    opts: {
      networkId: NetworkType.devnet,
    },
  });

  if (token === Token.SUI) {
    const balance = getBalance(CoinSymbol.SUI);
    return { error, loading, balance };
  }

  return { error: 'Unexpected Token', loading: false, balance: '0' };
}
