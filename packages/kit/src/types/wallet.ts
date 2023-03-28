import {
  WalletWithFeatures,
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnectMethod,
  StandardEventsOnMethod,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignMessageFeature,
  SuiSignTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignTransactionBlockMethod,
  SuiSignMessageMethod,
  StandardDisconnectFeature,
  StandardEventsFeature,
} from "@mysten/wallet-standard";

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

export type IWalletAdapter = WalletWithFeatures<
  StandardConnectFeature &
  StandardEventsFeature &
  SuiSignAndExecuteTransactionBlockFeature &
  SuiSignTransactionBlockFeature &
  SuiSignMessageFeature &
  Partial<StandardDisconnectFeature>
  > & {
  hasFeature: (name: string) => boolean;
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  signTransactionBlock: SuiSignTransactionBlockMethod;
  signMessage: SuiSignMessageMethod;
};