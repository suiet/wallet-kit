import { CoinStruct } from "@mysten/sui/client";
import {
  getObjectFields,
  getObjectId,
  getObjectType,
  SuiMoveObject,
  SuiObjectInfo,
  SuiObjectResponse,
} from "../types";
import { normalizeSuiObjectId } from "../utils";
import { bcs } from "@mysten/sui/bcs";

type StructTag = typeof bcs.StructTag.$inferType

export type ObjectData = ObjectDataFull | SuiObjectInfo;
export type ObjectDataFull = SuiObjectResponse | SuiMoveObject;
export const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;

export function isObjectDataFull(
  resp: ObjectData | ObjectDataFull
): resp is SuiObjectResponse {
  return !!(resp as SuiObjectResponse).data || !!(resp as SuiMoveObject).type;
}

/**
 * Utility class for 0x2::coin
 * as defined in https://github.com/MystenLabs/sui/blob/ca9046fd8b1a9e8634a4b74b0e7dabdc7ea54475/sui_programmability/framework/sources/CoinUtil.move#L4
 */
export class CoinUtil {
  static isCoin(data: ObjectData): boolean {
    return CoinUtil.getType(data)?.match(COIN_TYPE_ARG_REGEX) != null;
  }

  static getCoinType(type: string) {
    const [, res] = type.match(COIN_TYPE_ARG_REGEX) ?? [];
    return res || null;
  }

  static getCoinTypeArg(obj: ObjectData) {
    const type = CoinUtil.getType(obj);
    return type ? CoinUtil.getCoinType(type) : null;
  }

  static isSUI(obj: ObjectData) {
    const arg = CoinUtil.getCoinTypeArg(obj);
    return arg ? CoinUtil.getCoinSymbol(arg) === "SUI" : false;
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
      (partialSum, c) => partialSum + CoinUtil.getBalanceFromCoinStruct(c),
      BigInt(0)
    );
  }

  /**
   * Sort coin by balance in an ascending order
   */
  static sortByBalance(coins: CoinStruct[]): CoinStruct[] {
    return [...coins].sort((a, b) =>
      CoinUtil.getBalanceFromCoinStruct(a) <
      CoinUtil.getBalanceFromCoinStruct(b)
        ? -1
        : CoinUtil.getBalanceFromCoinStruct(a) >
          CoinUtil.getBalanceFromCoinStruct(b)
        ? 1
        : 0
    );
  }

  static getBalanceFromCoinStruct(coin: CoinStruct): bigint {
    return BigInt(coin.balance);
  }

  static getBalance(data: ObjectDataFull): bigint | undefined {
    if (!CoinUtil.isCoin(data)) {
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
