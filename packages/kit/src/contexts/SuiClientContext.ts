import { createContext } from "react";
import { UnknownChain } from "@suiet/wallet-sdk";
import { SuiClient } from "@mysten/sui/client";

export const SuiClientContext = createContext<SuiClient>(
  new SuiClient({
    url: UnknownChain.rpcUrl,
  })
);
