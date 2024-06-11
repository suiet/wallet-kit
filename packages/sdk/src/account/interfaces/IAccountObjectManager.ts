import { SuiClient, SuiObjectData } from "@mysten/sui/client";

export interface IAccountObjectManager {
  getOwnedObjects(address: string): Promise<SuiObjectData[]>;
  getSuiClient(): SuiClient;
  setSuiClient(suiClient: SuiClient): void;
}
