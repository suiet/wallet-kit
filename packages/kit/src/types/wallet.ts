import {
  ConnectMethod,
  DisconnectMethod,
  SuiSignAndExecuteTransactionMethod,
  ConnectFeature, DisconnectFeature, EventsFeature, WalletWithFeatures,
  EventsOnMethod,
} from "@mysten/wallet-standard";
import {SuiSignAndExecuteTransactionFeature} from "@mysten/wallet-standard/src/features";
import {ExpSignMessageMethod} from "../wallet-standard/features/exp_sign-message";

export enum PresetWallet {
  SUI_WALLET = "Sui Wallet",
  SUIET_WALLET = "Suiet",
  ETHOS_WALLET = "Ethos Wallet",
}

export interface IWallet {
  name: string;
  adapter: IWalletAdapter | undefined;
  installed: boolean | undefined;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
  };
}

export type IDefaultWallet = Omit<IWallet,
  keyof {
    adapter: any;
    installed: any;
  }>;

export enum ConnectionStatus {
  DISCONNECTED = "disconnected",
  CONNECTED = "connected",
  CONNECTING = "connecting",
}

export type IWalletAdapter = WalletWithFeatures<ConnectFeature &
  EventsFeature &
  SuiSignAndExecuteTransactionFeature &
  Partial<DisconnectFeature>> & {
  hasFeature: (name: string) => boolean;
  connect: ConnectMethod;
  disconnect: DisconnectMethod;
  signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  signMessage: ExpSignMessageMethod; // experimental feature
  on: EventsOnMethod;
};