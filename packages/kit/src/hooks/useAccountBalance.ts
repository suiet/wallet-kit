import {useWallet} from './useWallet';
import {useCoinBalance} from './useCoinBalance';
import {SUI_TYPE_ARG} from "@mysten/sui.js";

export function useAccountBalance() {
  const { account, chain } = useWallet();
  const { error, loading, balance } = useCoinBalance({
    address: account?.address ?? '',
    typeArg: SUI_TYPE_ARG,
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
