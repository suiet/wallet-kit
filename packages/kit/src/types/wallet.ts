import { IWalletAdapter } from "@suiet/wallet-sdk";

export interface IWallet {
  name: string;
  label: string;
  adapter: IWalletAdapter | undefined;
  installed: boolean | undefined;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
  };
}

export type IDefaultWallet = Omit<
  IWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;

export enum ConnectionStatus {
  DISCONNECTED = "disconnected",
  CONNECTED = "connected",
  CONNECTING = "connecting",
}
