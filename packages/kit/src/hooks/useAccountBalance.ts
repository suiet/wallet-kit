import {NetworkType} from '../core/types/network';
import {useWallet} from './useWallet';
import {useCoinBalance} from './useCoinBalance';

export enum CoinSymbol {
  SUI = 'SUI',
}

export function useAccountBalance() {
  const { account } = useWallet();
  const { error, loading, balance } = useCoinBalance({
    address: account?.address ?? '',
    symbol: CoinSymbol.SUI,
    opts: {
      networkId: NetworkType.devnet,
    },
  });
  return {
    balance,
    error,
    loading,
  };
}
