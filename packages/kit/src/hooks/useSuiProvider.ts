import {JsonRpcProvider, Connection} from '@mysten/sui.js';
import {useMemo} from 'react';

export type SuiProvider = JsonRpcProvider;

export function useSuiProvider(endpoint: string): SuiProvider {
  return useMemo<JsonRpcProvider>(() => new JsonRpcProvider(new Connection({fullnode: endpoint})), [endpoint]);
}
