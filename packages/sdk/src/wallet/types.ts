import type { IWalletAdapter } from "../wallet-standard";

export enum WalletType {
  EXTENSION = "EXTENSION",
  WEB = "WEB",
}

export type UnregisterWalletCallback = () => void;
export type RegisterWalletCallbackInput = {
  appName: string;
  origin?: string;
  network?: "mainnet" | "testnet";
};
export type RegisterWalletCallbackExternal = (
  input: RegisterWalletCallbackInput
) => UnregisterWalletCallback;
export type RegisterWalletCallback = () => UnregisterWalletCallback;

export interface IWallet {
  id?: string; // if not provided, use name as id
  name: string;
  label: string;
  type?: WalletType; // extension wallet by default
  adapter: IWalletAdapter | undefined;
  installed: boolean | undefined;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
    registerWebWallet?: RegisterWalletCallback;
  };
}

export type IDefaultWallet = Omit<
  IWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;
