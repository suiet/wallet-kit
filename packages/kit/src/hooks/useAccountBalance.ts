import {useCoinBalance} from './useCoinBalance';

export interface UseAccountBalanceParams {
  typeArg?: string;
  chainId?: string;
}

export function useAccountBalance(params?: UseAccountBalanceParams) {
  const {
    typeArg,
    chainId,
  } = params || {}
  const { error, isLoading, data } = useCoinBalance({
    typeArg,
    chainId,
  });
  return {
    data,
    error,
    isLoading,
    // legacy interface
    balance: data,
    loading: isLoading,
  };
}
