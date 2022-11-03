import { ExpSignMessageMethod, IWalletAdapter } from "../types/wallet";
import {
  ConnectInput,
  ConnectMethod,
  ConnectOutput,
  StandardWalletAdapterWallet,
  DisconnectMethod,
  EventsListeners,
  EventsOnMethod,
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput,
  EventsNames,
  SuiSignAndExecuteTransactionMethod,
  SignMessageInput,
  SignMessageOutput,
} from "@mysten/wallet-standard";
import { has } from "lodash-es";
import { WalletNotImplementError } from "../errors";

export enum FeatureName {
  STANDARD__CONNECT = "standard:connect",
  STANDARD__DISCONNECT = "standard:disconnect",
  STANDARD__EVENTS = "standard:events",
  SUI__SIGN_AND_TRANSACTION = "sui:signAndExecuteTransaction",
  EXP__SIGN_MESSAGE = "experimental:signMessage",
}

/**
 * Wrap the adapter that supports wallet-standard
 * provider universal interfaces to component usage
 */
export class WalletAdapter implements IWalletAdapter {
  private standardWalletAdapter: StandardWalletAdapterWallet;

  get name() {
    return this.standardWalletAdapter.name;
  }

  get icon() {
    return this.standardWalletAdapter.icon;
  }

  get version() {
    return this.standardWalletAdapter.version;
  }

  get accounts() {
    return this.standardWalletAdapter.accounts;
  }

  get chains() {
    return this.standardWalletAdapter.chains;
  }

  get features() {
    return this.standardWalletAdapter.features;
  }

  constructor(standardWalletAdapter: StandardWalletAdapterWallet) {
    this.standardWalletAdapter = standardWalletAdapter;
  }

  connect(input: ConnectInput | undefined): Promise<ConnectOutput> {
    const feature = this.getFeature<{ connect: ConnectMethod }>(
      FeatureName.STANDARD__CONNECT
    );
    return feature.connect(input);
  }

  disconnect(): Promise<void> {
    const feature = this.getFeature<{ disconnect: DisconnectMethod }>(
      FeatureName.STANDARD__DISCONNECT
    );
    return feature.disconnect();
  }

  on<T extends EventsNames>({
    event,
    listener,
  }: {
    event: T;
    listener: EventsListeners[T];
  }) {
    const feature = this.getFeature<{ on: EventsOnMethod }>(
      FeatureName.STANDARD__EVENTS
    );
    feature.on<T>(event, listener);
  }

  signAndExecuteTransaction(
    input: SuiSignAndExecuteTransactionInput
  ): Promise<SuiSignAndExecuteTransactionOutput> {
    const feature = this.getFeature<{
      signAndSendTransaction: SuiSignAndExecuteTransactionMethod;
    }>(FeatureName.SUI__SIGN_AND_TRANSACTION);
    return feature.signAndSendTransaction(input);
  }

  signMessage(input: SignMessageInput): Promise<SignMessageOutput> {
    const feature = this.getFeature<{ signMessage: ExpSignMessageMethod }>(
      FeatureName.EXP__SIGN_MESSAGE
    );
    return feature.signMessage(input);
  }

  private getFeature<T = any>(name: string): T {
    const { features } = this.standardWalletAdapter;
    if (!has(features, name)) {
      throw new WalletNotImplementError(name);
    }
    return (features as any)[name];
  }
}
