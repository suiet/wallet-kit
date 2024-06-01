import {
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignMessageFeature,
  SuiSignMessageMethod,
  SuiSignTransactionBlockFeature,
  SuiSignTransactionBlockMethod,
  WalletWithFeatures,
  SuiSignPersonalMessageFeature,
  SuiSignPersonalMessageMethod,
  SuiSignTransactionMethod,
} from "@mysten/wallet-standard";

export type IWalletAdapter = WalletWithFeatures<
  StandardConnectFeature &
    StandardEventsFeature &
    SuiSignAndExecuteTransactionBlockFeature &
    SuiSignTransactionBlockFeature &
    SuiSignMessageFeature &
    SuiSignPersonalMessageFeature &
    Partial<StandardDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  signTransaction: SuiSignTransactionMethod;
  signPersonalMessage: SuiSignPersonalMessageMethod;
  /**
   * @deprecated use signTransaction instead
   */
  signTransactionBlock: SuiSignTransactionBlockMethod;
  /**
   * @deprecated use signPersonalMessage instead
   */
  signMessage: SuiSignMessageMethod;
};
