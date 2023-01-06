import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';
import {swrLoading} from '../utils/others';
import {Chain} from "../types/chain";
import {UnknownChain} from "../chain/constants";
import {Account, Provider} from "@suiet/wallet-sdk";

export function useCoinBalance({
  address,
  typeArg,
  opts = {},
}: {
  address: string;
  typeArg?: string;
  opts: {
    chain?: Chain;
  };
}) {
  const [balance, setBalance] = useState<string>('0');
  const { chain = UnknownChain } = opts;
  const {
    data: coinsBalanceMap,
    error,
    isValidating,
  } = useSWR(
    [`a?chain=${chain.id}`, address, chain],
    fetchCoinsBalanceMap
  );

  async function fetchCoinsBalanceMap(
    _: string,
    address: string,
    chain: Chain,
  ) {
    const map = new Map<string, string>();
    if (!address || !chain || chain.id === UnknownChain.id) {
      return map;
    }

    const provider = new Provider(chain.rpcUrl);
    const account = new Account(provider, address);
    const coinsBalance = await account.balance.getAll()

    if (!coinsBalance) {
      throw new Error(`fetch coinsBalance failed: ${address}, ${chain.id}`);
    }
    coinsBalance.forEach((item) => {
      map.set(item.typeArg, String(item.balance));
    });
    return map;
  }

  const getBalance = useCallback(
    (symbol: string): string => {
      if (!symbol || !coinsBalanceMap) return '0';
      return coinsBalanceMap.get(symbol) ?? '0';
    },
    [coinsBalanceMap]
  );

  useEffect(() => {
    if (!coinsBalanceMap || !typeArg) return;
    const result = coinsBalanceMap.get(typeArg);
    setBalance(result ?? '0');
  }, [coinsBalanceMap, typeArg]);

  return {
    balance,
    error,
    isValidating,
    loading: swrLoading(coinsBalanceMap, error),
    getBalance,
  };
}
