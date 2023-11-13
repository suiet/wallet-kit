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
  private subscriptions = new Set<WalletRadarSubscriptionInput>();

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
          this.notifySubscribers();
        });
      }
    );
  }

  deactivate(): void {
    if (this.clearOnRegisterListener) {
      this.clearOnRegisterListener();
    }
    this.walletAdapterMap.clear();
  }

  getDetectedWalletAdapters(): IWalletAdapter[] {
    return Array.from(this.walletAdapterMap.values());
  }

  subscribe(
    callback: WalletRadarSubscriptionInput
  ): WalletRadarSubscriptionOutput {
    this.subscriptions.add(callback);
    return () => {
      this.subscriptions.delete(callback);
    };
  }

  private notifySubscribers() {
    this.subscriptions.forEach((subscription) => {
      subscription(this.getDetectedWalletAdapters());
    });
  }

  private setDetectedWalletAdapters(rawAdapter: Wallet) {
    if (!isStandardWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.walletAdapterMap.has(rawAdapter.name)) return;

    this.walletAdapterMap.set(rawAdapter.name, new WalletAdapter(rawAdapter));
  }
}
