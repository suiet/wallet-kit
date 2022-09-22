import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { network } from '../core/network';
import { Provider } from '../core/provider';
import { Network, NetworkType } from '../core/types/network';
import { swrLoading } from '../utils/others';

export enum CoinSymbol {
  SUI = 'SUI',
}

export type GetOwnedObjParams = { network: Network; address: string };

async function getCoinsBalance(
  params: GetOwnedObjParams
): Promise<Array<{ symbol: string; balance: string }>> {
  const { network, address } = params;
  const provider = new Provider(network.queryRpcUrl, network.gatewayRpcUrl);
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
  symbol?: CoinSymbol;
  opts: {
    networkId?: string;
  };
}) {
  const [balance, setBalance] = useState<string>('0');
  const { networkId = 'devnet' } = opts;
  const net = network.getNetwork(NetworkType.devnet);
  const {
    data: coinsBalanceMap,
    error,
    isValidating,
  } = useSWR(['fetchCoinsBalanceMap', address, network], fetchCoinsBalanceMap);

  async function fetchCoinsBalanceMap(
    _: string,
    address: string,
    network: Network
  ) {
    const map = new Map<string, string>();
    if (!address || !network) return map;

    const coinsBalance = await getCoinsBalance({ address, network: net });
    if (!coinsBalance) {
      throw new Error(`fetch coinsBalance failed: ${address}, ${networkId}`);
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
