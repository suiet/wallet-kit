import {Token} from '../constants/token';
import {NetworkType} from '../core/types/network';
import {useWallet} from './useWallet';
import {useCoinBalance} from './useCoinBalance';
import {formatCurrency} from "../utils/formatCurrency";
import {useMemo} from "react";

export enum CoinSymbol {
  SUI = 'SUI',
}

export function useAccountBalance() {
  const { account } = useWallet();
  const { error, loading, balance: rawBalance } = useCoinBalance({
    address: account?.address ?? '',
    symbol: CoinSymbol.SUI,
    opts: {
      networkId: NetworkType.devnet,
    },
  });
  const balance = useMemo(() => formatCurrency(rawBalance), [rawBalance])
  return {
    balance,
    rawBalance,
    error,
    loading,
  };
}
