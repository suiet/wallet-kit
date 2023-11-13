export interface IAccount {
  getSuiBalance(): Promise<bigint>;
  getAddress(): string;
}
