import { SuiClient } from "@mysten/sui.js/client";
import { useMemo } from "react";

export type SuiProvider = SuiClient;

export function useSuiProvider(endpoint: string): SuiProvider {
  return useMemo<SuiClient>(() => new SuiClient({ url: endpoint }), [endpoint]);
}
