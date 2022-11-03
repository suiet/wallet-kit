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
  SUI_WALLET = "SUI_WALLET",
  SUIET_WALLET = "SUIET_WALLET",
  ETHOS_WALLET = "ETHOS_WALLET",
}

export interface IWallet {
  name: string;
  adapter: IWalletAdapter | null;
  installed: boolean | undefined;
  iconUrl: string | (() => Promise<string>);
  downloadUrl?: {
    browserExtension?: string; // chrome default
  };
}

export enum ConnectionStatus {
  DISCONNECTED = "disconnected",
  CONNECTED = "connected",
  CONNECTING = "connecting",
}

export type IWalletAdapter = StandardWalletAdapterWallet & {
  connect: ConnectMethod;
  disconnect: DisconnectMethod;
  signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  signMessage: (input: SignMessageInput) => Promise<SignMessageOutput>; // experimental feature
  on: EventsOnMethod;
};
