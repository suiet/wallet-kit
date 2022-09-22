import { SuiMoveObject } from '@mysten/sui.js';

const COIN_TYPE = '0x2::coin::Coin';
const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;

export type CoinObject = {
  objectId: string;
  symbol: string;
  balance: bigint;
};

export class Coin {
  public static isCoin(obj: SuiMoveObject) {
    return obj.type.startsWith(COIN_TYPE);
  }

  public static isSUI(obj: SuiMoveObject) {
    const arg = Coin.getCoinTypeArg(obj);
    return arg ? Coin.getCoinSymbol(arg) === 'SUI' : false;
  }

  public static getCoinObject(obj: SuiMoveObject): CoinObject {
    const arg = Coin.getCoinTypeArg(obj);
    return {
      objectId: obj.fields.id.id,
      symbol: arg ? Coin.getCoinSymbol(arg) : '',
      balance: BigInt(obj.fields.balance),
    };
  }

  public static getBalance(obj: SuiMoveObject) {
    return BigInt(obj.fields.balance);
  }

  static getCoinTypeArg(obj: SuiMoveObject) {
    const res = obj.type.match(COIN_TYPE_ARG_REGEX);
    return res ? res[1] : null;
  }

  static getCoinSymbol(coinTypeArg: string) {
    return coinTypeArg.substring(coinTypeArg.lastIndexOf(':') + 1);
  }

  static getCoinTypeFromArg(coinTypeArg: string) {
    return `${COIN_TYPE}<${coinTypeArg}>`;
  }
}

export type NftObject = {
  objectId: string;
  name: string;
  description: string;
  url: string;
  previousTransaction?: string;
  objectType: string;
};

export class Nft {
  public static isNft(obj: SuiMoveObject) {
    if (obj.fields.name && obj.fields.description && obj.fields.url) {
      return true;
    }
    return false;
  }

  public static getNftObject(
    obj: SuiMoveObject,
    previousTransaction?: string
  ): NftObject {
    return {
      objectId: obj.fields.id.id,
      name: obj.fields.name,
      description: obj.fields.description,
      url: obj.fields.url,
      previousTransaction,
      objectType: obj.type,
    };
  }
}
