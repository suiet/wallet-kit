import {useCallback, useEffect, useState} from 'react';
import useSWR from 'swr';
import {Provider} from '../core/provider';
import {swrLoading} from '../utils/others';
import {Chain} from "../types/chain";
import {UnknownChain} from "../chain/constants";
import {Token} from "../constants/token";

async function getCoinsBalance(
  params: { chain: Chain; address: string }
): Promise<Array<{ symbol: string; balance: string }>> {
  const { chain, address } = params;

  const provider = new Provider(chain.rpcUrl);
  const objects = await provider.query.getOwnedCoins(address);

  const result = new Map();
  for (const object of objects) {
    result.has(object.symbol)
      ? result.set(object.symbol, result.get(object.symbol) + object.balance)
      : result.set(object.symbol, object.balance);
  }
  return Array.from(result.entries()).map((item) => ({
    symbol: item[0] as string,
    balance: String(item[1]),
  }));
}

export function useCoinBalance({
  address,
  symbol,
  opts = {},
}: {
  address: string;
  symbol?: Token;
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

    const coinsBalance = await getCoinsBalance({ address, chain });
    if (!coinsBalance) {
      throw new Error(`fetch coinsBalance failed: ${address}, ${chain.id}`);
    }
    coinsBalance.forEach((item) => {
      map.set(item.symbol, item.balance);
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
    if (!coinsBalanceMap || !symbol) return;
    const result = coinsBalanceMap.get(symbol);
    setBalance(result ?? '0');
  }, [coinsBalanceMap, symbol]);

  return {
    balance,
    error,
    isValidating,
    loading: swrLoading(coinsBalanceMap, error),
    getBalance,
  };
}
