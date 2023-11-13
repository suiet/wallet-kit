import { IAccountObjectManager } from "./interfaces/IAccountObjectManager";
import {
  SuiClient,
  SuiObjectData,
  SuiObjectResponse,
} from "@mysten/sui.js/client";

export class AccountObjectManager implements IAccountObjectManager {
  private client: SuiClient;
  constructor(suiClient: SuiClient) {
    this.client = suiClient;
  }

  async getOwnedObjects(address: string): Promise<SuiObjectData[]> {
    let hasNextPage = true;
    let nextCursor = null;
    let objects: SuiObjectData[] = [];
    while (hasNextPage) {
      const resp: any = await this.client.getOwnedObjects({
        owner: address,
        cursor: nextCursor,
        options: {
          showType: true,
          showDisplay: true,
          showContent: true,
          showOwner: true,
        },
      });
      const sui_object_responses = resp.data as SuiObjectResponse[];

      sui_object_responses?.forEach((res) => {
        const obj = res.data;
        if (obj) {
          objects.push(obj);
        }
      });
      hasNextPage = resp.hasNextPage;
      nextCursor = resp.nextCursor;
    }
    return objects;
  }

  getSuiClient(): SuiClient {
    return this.client;
  }
  setSuiClient(suiClient: SuiClient) {
    this.client = suiClient;
  }
}
