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
  SuiSignTransactionFeature,
  SuiSignAndExecuteTransactionFeature,
  SuiSignAndExecuteTransactionMethod,
  SuiReportTransactionEffectsFeature,
  SuiReportTransactionEffectsMethod,
} from "@mysten/wallet-standard";

export type IWalletAdapter = WalletWithFeatures<
  StandardConnectFeature &
    StandardEventsFeature &
    SuiSignPersonalMessageFeature &
    SuiSignTransactionFeature &
    SuiSignAndExecuteTransactionFeature &
    SuiReportTransactionEffectsFeature &
    SuiSignMessageFeature &
    SuiSignTransactionBlockFeature &
    SuiSignAndExecuteTransactionBlockFeature &
    Partial<StandardDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signTransaction: SuiSignTransactionMethod;
  signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  signPersonalMessage: SuiSignPersonalMessageMethod;
  reportTransactionEffects: SuiReportTransactionEffectsMethod;
  /**
   * @deprecated use signAndExecuteTransaction instead
   */
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  /**
   * @deprecated use signTransaction instead
   */
  signTransactionBlock: SuiSignTransactionBlockMethod;
  /**
   * @deprecated use signPersonalMessage instead
   */
  signMessage: SuiSignMessageMethod;
};
