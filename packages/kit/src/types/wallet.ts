import {
  ConnectMethod,
  DisconnectMethod,
  SuiSignAndExecuteTransactionMethod,
  EventsOnMethod,
  StandardWalletAdapterWallet,
  SignMessageInput,
  SignMessageOutput,
} from "@mysten/wallet-standard";

export enum SupportedWallet {
  SUI_WALLET = "Sui Wallet",
  SUIET_WALLET = "Suiet Wallet",
  ETHOS_WALLET = "Ethos Wallet",
}

export interface IWallet {
  name: string;
  adapter: IWalletAdapter | undefined;
  installed: boolean | undefined;
  iconUrl: string | (() => Promise<string>);
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

export type ExpSignMessageMethod = (
  input: SignMessageInput
) => Promise<SignMessageOutput>;

export type IWalletAdapter = StandardWalletAdapterWallet & {
  connect: ConnectMethod;
  disconnect: DisconnectMethod;
  signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  signMessage: ExpSignMessageMethod; // experimental feature
};
