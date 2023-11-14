import {
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignMessageFeature, SuiSignMessageMethod,
  SuiSignTransactionBlockFeature, SuiSignTransactionBlockMethod,
  WalletWithFeatures
} from "@mysten/wallet-standard";

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
