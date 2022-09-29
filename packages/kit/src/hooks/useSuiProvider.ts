import {
  JsonRpcProvider
} from '@mysten/sui.js';
import { useRef } from 'react';

interface SuiProvider extends JsonRpcProvider {
}

export function useSuiProvider(endpoint: string): SuiProvider {
  const provider = useRef<JsonRpcProvider>();

  if (!provider.current) {
    provider.current = new JsonRpcProvider(endpoint);
  }

  return provider.current;
}
