import {Provider} from "../common/providers";
import {SUI_TYPE_ARG} from "@mysten/sui.js";

export class AccountBalance {
  private provider: Provider;
  private address: string;

  constructor(provider: Provider, address: string) {
    this.provider = provider;
    this.address = address;
  }

  /**
   * Get the account balance of one specific token type
   * @param tokenTypeArg SUI by default
   */
  async get(tokenTypeArg: string = SUI_TYPE_ARG): Promise<bigint> {
    const tokenBalanceList = await this.getAllCoins();
    const target = tokenBalanceList.find(item => item.typeArg === tokenTypeArg)
    return target?.balance || BigInt(0)
  }

  /**
   * Get owned coins list with balance of all types
   */
  async getAllCoins(): Promise<Array<{ typeArg: string; balance: bigint }>> {
    const objects = await this.provider.query.getOwnedCoins(this.address);
    const result = new Map<string, bigint>();
    for (const object of objects) {
      result.has(object.typeArg)
        ? result.set(object.typeArg, result.get(object.typeArg) as bigint + object.balance)
        : result.set(object.typeArg, object.balance);
    }
    return Array.from(result.entries()).map((item) => ({
      typeArg: item[0],
      balance: item[1],
    }));
  }
}

