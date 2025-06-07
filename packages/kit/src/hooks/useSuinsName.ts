import { useQuery } from "react-query";
import { QueryKey, queryKey } from "../constants";
import { useCallback } from "react";
import { SuiClient } from "@mysten/sui/client";
import { Chain, resolveAddressToSuiNSNames } from "@suiet/wallet-sdk";

export interface UseSuinsNameParams {
  address: string | undefined;
  chain: Chain | undefined;
  enabled?: boolean;
  cacheDuration?: number;
}

export interface UseSuinsNameResult {
  defaultName: string | null;
  names: string[];
  loading: boolean;
  error: any;
}

export function useSuinsNames(params?: UseSuinsNameParams): UseSuinsNameResult {
  const {
    address,
    chain,
    cacheDuration = 5 * 60 * 1000,
    enabled = true,
  } = params || {};

  const key = queryKey(QueryKey.SUINS_NAME, {
    address,
    chainId: chain?.id,
  });

  const resolveSuinsNames = useCallback(async () => {
    if (!address || !chain) return [];
    
    const suiClient = new SuiClient({
      url: chain.rpcUrl,
    });
    const names = await resolveAddressToSuiNSNames(suiClient, address);
    return names;
  }, [chain, address]);

  const { data: names = [], isLoading, error } = useQuery(key, resolveSuinsNames, {
    enabled: enabled && !!address && !!chain,
    staleTime: cacheDuration,
    cacheTime: cacheDuration,
  });

  return {
    defaultName: names.length > 0 ? names[0] : null,
    names,
    loading: isLoading,
    error,
  };
}
