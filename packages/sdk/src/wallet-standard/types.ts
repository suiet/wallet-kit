import {IWalletAdapter} from "./interfaces/IWalletAdapter";

export type WalletRadarSubscriptionInput = (wallets: IWalletAdapter[]) => void;
export type WalletRadarSubscriptionOutput = () => void;
