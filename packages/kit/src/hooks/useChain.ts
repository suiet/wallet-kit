import {useWallet} from "./useWallet";
import {useMemo} from "react";

/**
 * use chain config from context by chainId
 * @param chainId
 */
export function useChain(chainId?: string) {
  const wallet = useWallet()
  if (!chainId) return wallet.chain;
  return useMemo(() => {
    return wallet.chains.find(w => w.id === chainId)
  }, [chainId, wallet.chains])
}