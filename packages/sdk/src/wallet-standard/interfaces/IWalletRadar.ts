import { IWalletAdapter } from "./IWalletAdapter";
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from "../types";

export interface IWalletRadar {
  activate: () => void;
  deactivate: () => void;
  getDetectedWalletAdapters: () => IWalletAdapter[];
  /**
   * Subscribe to detected wallet updates
   * @param callback
   */
  subscribe: (
    callback: WalletRadarSubscriptionInput
  ) => WalletRadarSubscriptionOutput;
}
