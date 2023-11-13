import { AccountBalance } from "./balance";
import { Provider } from "../common";

export class Account {
  public balance: AccountBalance;
  constructor(provider: Provider, address: string) {
    this.balance = new AccountBalance(provider, address);
  }
}
