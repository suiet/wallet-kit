import { IAccount } from "./interfaces/IAccount";

export class Account implements IAccount {
  getAddress(): string {
    return "";
  }

  getSuiBalance(): Promise<bigint> {
    return Promise.resolve(0n);
  }
}
