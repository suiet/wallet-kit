import { SuiMoveObject, SuiObjectInfo } from "../../lib/sui-ts-sdk";
import { SuiObjectResponse } from "@mysten/sui.js/client";

type ObjectData = ObjectDataFull | SuiObjectInfo;
type ObjectDataFull = SuiObjectResponse | SuiMoveObject;

export class CoinTool {
  static isCoin(data: ObjectData): boolean {
    return Coin.getType(data)?.match(COIN_TYPE_ARG_REGEX) != null;
  }

  static getCoinType(type: string) {
    const [, res] = type.match(COIN_TYPE_ARG_REGEX) ?? [];
    return res || null;
  }

  static getCoinTypeArg(obj: ObjectData) {
    const type = Coin.getType(obj);
    return type ? Coin.getCoinType(type) : null;
  }

  static isSUI(obj: ObjectData) {
    const arg = Coin.getCoinTypeArg(obj);
    return arg ? Coin.getCoinSymbol(arg) === "SUI" : false;
  }

  static getCoinSymbol(coinTypeArg: string) {
    return coinTypeArg.substring(coinTypeArg.lastIndexOf(":") + 1);
  }

  static getCoinStructTag(coinTypeArg: string): StructTag {
    return {
      address: normalizeSuiObjectId(coinTypeArg.split("::")[0]),
      module: coinTypeArg.split("::")[1],
      name: coinTypeArg.split("::")[2],
      typeParams: [],
    };
  }

  public static getID(obj: ObjectData): string {
    if ("fields" in obj) {
      return obj.fields.id.id;
    }
    return getObjectId(obj);
  }

  static totalBalance(coins: CoinStruct[]): bigint {
    return coins.reduce(
      (partialSum, c) => partialSum + Coin.getBalanceFromCoinStruct(c),
      BigInt(0)
    );
  }

  /**
   * Sort coin by balance in an ascending order
   */
  static sortByBalance(coins: CoinStruct[]): CoinStruct[] {
    return [...coins].sort((a, b) =>
      Coin.getBalanceFromCoinStruct(a) < Coin.getBalanceFromCoinStruct(b)
        ? -1
        : Coin.getBalanceFromCoinStruct(a) > Coin.getBalanceFromCoinStruct(b)
        ? 1
        : 0
    );
  }

  static getBalanceFromCoinStruct(coin: CoinStruct): bigint {
    return BigInt(coin.balance);
  }

  static getBalance(data: ObjectDataFull): bigint | undefined {
    if (!Coin.isCoin(data)) {
      return undefined;
    }
    const balance = getObjectFields(data)?.balance;
    return BigInt(balance);
  }

  private static getType(data: ObjectData): string | null | undefined {
    if (isObjectDataFull(data)) {
      return getObjectType(data);
    }
    return data.type;
  }
}
