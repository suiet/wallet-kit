import { SuiClient } from "@mysten/sui/client";
import { useMemo } from "react";

export type SuiProvider = SuiClient;

/**
 * Return a SuiClient instance.
 * @deprecated Use `useSuiClient` instead.
 */
export function useSuiProvider(endpoint: string): SuiProvider {
  return useMemo<SuiClient>(() => new SuiClient({ url: endpoint }), [endpoint]);
}
