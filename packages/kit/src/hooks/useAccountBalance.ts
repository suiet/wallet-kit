import {useWallet} from './useWallet';
import {useCoinBalance} from './useCoinBalance';
import {Token} from "../constants/token";

export function useAccountBalance() {
  const { account, chain } = useWallet();
  const { error, loading, balance } = useCoinBalance({
    address: account?.address ?? '',
    symbol: Token.SUI,
    opts: {
      chain,
    },
  });
  return {
    balance,
    error,
    loading,
  };
}
