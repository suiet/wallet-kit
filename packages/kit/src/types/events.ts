import {EventsListeners, Wallet, SuiChain, WalletAccount} from "@mysten/wallet-standard";

export type WalletEvent = keyof EventsListeners
  | 'chainChange'
  | 'featureChange'
  | 'accountChange'

export type WalletEventListeners = EventsListeners & {
  chainChange: (params: ChainChangeParams) => void;
  featureChange: (params: FeatureChangeParams) => void;
  accountChange: (params: AccountChangeParams) => void;
}

export interface ChainChangeParams {
  chain: SuiChain;
}

export interface AccountChangeParams {
  account: WalletAccount;
}

export interface FeatureChangeParams {
  features: Wallet['features'];
}