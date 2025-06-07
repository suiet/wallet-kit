import { useQuery } from "react-query";
import { QueryKey, queryKey } from "../constants";
import { useCallback } from "react";
import { useChain } from "./useChain";
import { SuiClient } from "@mysten/sui/client";
import { resolveAddressToSuiNSNames } from "@suiet/wallet-sdk";

export interface UseSuinsNameParams {
  address?: string;
  chainId?: string;
  cacheDuration?: number;
  enabled?: boolean;
}

export interface UseSuinsNameResult {
  names: string[];
  primaryName: string | null;
  isLoading: boolean;
  error: any;
}

export function useSuinsName(params?: UseSuinsNameParams): UseSuinsNameResult {
  const {
    address,
    chainId,
    cacheDuration = 5 * 60 * 1000,
    enabled = true,
  } = params || {};
  const chain = useChain(chainId);

  const key = queryKey(QueryKey.SUINS_NAME, {
    address,
    chainId,
  });

  const resolveSuinsNames = useCallback(async () => {
    if (!address || !chain) return [];
    
    const suiClient = new SuiClient({
      url: chain.rpcUrl,
    });
    return resolveAddressToSuiNSNames(suiClient, address);
  }, [chain, address]);

  const { data: names = [], isLoading, error } = useQuery(key, resolveSuinsNames, {
    enabled: enabled && !!address && !!chain,
    staleTime: cacheDuration,
    cacheTime: cacheDuration,
  });

  return {
    names,
    primaryName: names.length > 0 ? names[0] : null,
    isLoading,
    error,
  };
}
