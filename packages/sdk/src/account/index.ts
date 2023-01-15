import {Provider} from "../common/providers";
import {AccountBalance} from "./balance";

export class Account {
  public balance: AccountBalance;
  constructor(provider: Provider, address: string) {
    this.balance = new AccountBalance(provider, address);
  }
}