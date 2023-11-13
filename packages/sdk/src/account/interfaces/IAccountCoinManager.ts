import { SuiClient } from "@mysten/sui.js/client";
import { CoinObject } from "../../common";

export interface IAccountCoinManager {
  getOwnedCoins(address: string): Promise<CoinObject[]>;
  getBalance(address: string): Promise<bigint>;
  getSuiClient(): SuiClient;
  setSuiClient(suiClient: SuiClient): void;
}
