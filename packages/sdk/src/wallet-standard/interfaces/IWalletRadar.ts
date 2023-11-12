import { IWalletAdapter } from "./IWalletAdapter";
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from "../types";

export interface IWalletRadar {
  activate: () => void;
  deactivate: () => void;
  getDetectedWalletAdapters: () => IWalletAdapter[];
  subscribe: (
    callback: WalletRadarSubscriptionInput
  ) => WalletRadarSubscriptionOutput;
}
