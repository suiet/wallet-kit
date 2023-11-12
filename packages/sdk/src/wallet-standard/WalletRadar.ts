import { IWalletAdapter, IWalletRadar } from "./interfaces";
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from "./types";
import {
  getWallets,
  Wallet,
  Wallets as WalletStandardSdk,
} from "@mysten/wallet-standard";
import { isStandardWalletAdapterCompatibleWallet } from "./utils";
import { WalletAdapter } from "./WalletAdapter";

export class WalletRadar implements IWalletRadar {
  private walletStandardSdk: WalletStandardSdk | null;
  private walletAdapterMap: Map<string, IWalletAdapter>;
  private clearOnRegisterListener: null | (() => void);

  constructor() {
    this.walletStandardSdk = null;
    this.clearOnRegisterListener = null;
    this.walletAdapterMap = new Map();
  }

  activate(): void {
    this.walletStandardSdk = getWallets();
    const initialWalletAdapters = this.walletStandardSdk.get();
    initialWalletAdapters.forEach((adapter) => {
      this.setDetectedWalletAdapters(adapter);
    });
    this.clearOnRegisterListener = this.walletStandardSdk.on(
      "register",
      (...newAdapters) => {
        newAdapters.forEach((adapter) => {
          this.setDetectedWalletAdapters(adapter);
        });
      }
    );
  }

  deactivate(): void {
    if (this.clearOnRegisterListener) {
      this.clearOnRegisterListener();
    }
  }

  getDetectedWalletAdapters(): IWalletAdapter[] {
    return Array.from(this.walletAdapterMap.values());
  }

  subscribe(
    callback: WalletRadarSubscriptionInput
  ): WalletRadarSubscriptionOutput {
    return () => {};
  }

  private setDetectedWalletAdapters(rawAdapter: Wallet) {
    if (!isStandardWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.walletAdapterMap.has(rawAdapter.name)) return;

    this.walletAdapterMap.set(rawAdapter.name, new WalletAdapter(rawAdapter));
  }
}
