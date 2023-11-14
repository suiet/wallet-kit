import { CoinUtil } from "../lib/sui-ts-sdk";

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
    this._symbol = CoinUtil.getCoinSymbol(typeArg);
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
    return new CoinObject(obj.objectId, obj.typeArg, obj.balance);
  }

  toDto(): CoinObjectDto {
    return {
      objectId: this._objectId,
      balance: this._balance,
      typeArg: this._typeArg,
      symbol: this._symbol,
    };
  }

  toString(): string {
    return JSON.stringify(this.toDto());
  }
}
