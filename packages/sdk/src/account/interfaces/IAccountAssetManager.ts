export interface IAccountAssetManager {
  getSuiBalance(): Promise<bigint>;
  getCoinBalance(coinType: string): Promise<bigint>;
  getAddress(): string;
  setChainRpcUrl(chainRpcUrl: string): void;
  getChainRpcUrl(): string;
}
