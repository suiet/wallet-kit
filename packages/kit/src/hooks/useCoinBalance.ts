import {useWallet} from "./useWallet";
import {SUI_TYPE_ARG} from "@mysten/sui.js";
import {useQuery} from "react-query";
import {QueryKey, queryKey} from "../constants";
import {Account, Provider} from "@suiet/wallet-sdk";
import {useCallback} from "react";
import {useChain} from "./useChain";

export interface UseCoinBalanceParams {
  address?: string;
  typeArg?: string;
  chainId?: string;
}

/**
 * use the account balance of one specific coin (SUI by default)
 * @param params
 */
export function useCoinBalance(params?: UseCoinBalanceParams) {
  const wallet = useWallet()
  const {
    address = wallet.address,
    typeArg = SUI_TYPE_ARG,
    chainId = wallet.chain?.id,
  } = params || {}
  const chain = useChain(chainId)

  const key = queryKey(QueryKey.COIN_BALANCE, {
    address,
    typeArg,
    chainId,
  });
  const getCoinBalance = useCallback(() => {
    if (!address || !chain) return BigInt(0);

    const provider = new Provider(chain.rpcUrl);
    const account = new Account(provider, address);
    return account.balance.get(typeArg)
  }, [chain, address])

  return useQuery(key, getCoinBalance, {
    initialData: BigInt(0)
  })
}
