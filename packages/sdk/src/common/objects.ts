import {SuiMoveObject, Coin as CoinAPI} from "@mysten/sui.js";

const COIN_TYPE = '0x2::coin::Coin';
const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;

export type CoinObjectDto = {
  objectId: string;
  symbol: string;
  balance: bigint;
  typeArg: string;
};

export class CoinObject {
  private _objectId: string;
  private _typeArg: string;
  private _balance: bigint;
  private _symbol: string;

  constructor(objectId: string, typeArg: string, balance: bigint) {
    this._objectId = objectId;
    this._balance = balance;
    this._typeArg = typeArg;
    this._symbol = Coin.getCoinSymbol(typeArg);
  }

  get objectId() {
    return this._objectId;
  }

  get typeArg() {
    return this._typeArg;
  }

  get balance() {
    return this._balance;
  }

  get symbol() {
    return this._symbol;
  }

  static fromDto(obj: CoinObjectDto) {
    return new CoinObject(obj.objectId, obj.typeArg, obj.balance)
  }

  toDto(): CoinObjectDto {
    return {
      objectId: this._objectId,
      balance: this._balance,
      typeArg: this._typeArg,
      symbol: this._symbol,
    }
  }

  toString(): string {
    return JSON.stringify(this.toDto())
  }
}

export class Coin {
  public static isCoin(obj: SuiMoveObject) {
    return obj.type.startsWith(COIN_TYPE);
  }

  public static isSUI(obj: SuiMoveObject) {
    const arg = Coin.getCoinTypeArg(obj);
    return arg ? Coin.getCoinSymbol(arg) === 'SUI' : false;
  }

  public static getCoinObject(obj: SuiMoveObject): CoinObject {
    const typeArg = CoinAPI.getCoinTypeArg(obj)
    if (!typeArg) throw new Error('coin typeArg cannot be null');

    return new CoinObject(
      obj.fields.id.id,
      typeArg,
      BigInt(obj.fields.balance),
    );
  }

  public static getBalance(obj: SuiMoveObject) {
    return BigInt(obj.fields.balance);
  }

  static getCoinTypeArg(obj: SuiMoveObject) {
    return CoinAPI.getCoinTypeArg(obj);
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