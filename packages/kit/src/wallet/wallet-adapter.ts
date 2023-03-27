import {IWalletAdapter} from "../types/wallet";
import {
  ConnectInput,
  ConnectMethod,
  ConnectOutput,
  DisconnectMethod,
  EventsListeners,
  EventsNames,
  EventsOnMethod,
  Wallet,
} from "@mysten/wallet-standard";
import {has} from "lodash-es";
import {ErrorCode, WalletError, WalletNotImplementError} from "../errors";
import {handleConnectionError} from "./wallet-error-handling";
import {
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionMethod,
  SuiSignAndExecuteTransactionOutput,
  SuiSignMessageInput,
  SuiSignMessageMethod,
  SuiSignMessageOutput,
  SuiSignTransactionInput,
  SuiSignTransactionMethod,
  SuiSignTransactionOutput,
} from "../wallet-standard";

export enum FeatureName {
  STANDARD__CONNECT = "standard:connect",
  STANDARD__DISCONNECT = "standard:disconnect",
  STANDARD__EVENTS = "standard:events",
  SUI__SIGN_AND_EXECUTE_TRANSACTION = "sui:signAndExecuteTransaction",
  SUI__SIGN_MESSAGE = "sui:signMessage",
  SUI__SIGN_TRANSACTION = "sui:signTransaction",
}

/**
 * Wrap the adapter that supports wallet-standard
 * provider universal interfaces to component usage
 */
export class WalletAdapter implements IWalletAdapter {
  private standardWalletAdapter: Wallet;

  constructor(standardWalletAdapter: Wallet) {
    this.standardWalletAdapter = standardWalletAdapter;
  }

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
    return this.standardWalletAdapter.features as any;
  }

  async connect(input: ConnectInput | undefined): Promise<ConnectOutput> {
    const feature = this.getFeature<{ connect: ConnectMethod }>(
      FeatureName.STANDARD__CONNECT
    );
    try {
      return await feature.connect(input);
    } catch (e) {
      const {code, message, details} = handleConnectionError(e as Error, this.name)
      throw new WalletError(message, code, details)
    }
  }

  async disconnect(): Promise<void> {
    const feature = this.getFeature<{ disconnect: DisconnectMethod }>(
      FeatureName.STANDARD__DISCONNECT
    );
    try {
      return await feature.disconnect();
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__DISCONNECT_ERROR)
    }
  }

  on(event: EventsNames, listener: EventsListeners[EventsNames]): () => void {
    const feature = this.getFeature<{ on: EventsOnMethod }>(
      FeatureName.STANDARD__EVENTS
    );
    try {
      return feature.on<EventsNames>(event, listener);
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__LISTEN_TO_EVENT_ERROR)
    }
  }

  async signAndExecuteTransaction(
    input: SuiSignAndExecuteTransactionInput
  ): Promise<SuiSignAndExecuteTransactionOutput> {
    const feature = this.getFeature<{
      signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
    }>(FeatureName.SUI__SIGN_AND_EXECUTE_TRANSACTION);
    try {
      return await feature.signAndExecuteTransaction(input);
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__SIGN_TX_ERROR)
    }
  }

  signTransaction(input: SuiSignTransactionInput): Promise<SuiSignTransactionOutput> {
    const feature = this.getFeature<{
      signTransaction: SuiSignTransactionMethod;
    }>(FeatureName.SUI__SIGN_TRANSACTION);
    try {
      return feature.signTransaction(input);
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__SIGN_TX_ERROR)
    }
  }

  async signMessage(input: SuiSignMessageInput): Promise<SuiSignMessageOutput> {
    const feature = this.getFeature<{ signMessage: SuiSignMessageMethod }>(
      FeatureName.SUI__SIGN_MESSAGE
    );
    try {
      return await feature.signMessage(input);
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__SIGN_MSG_ERROR)
    }
  }

  hasFeature(name: string): boolean {
    const {features} = this.standardWalletAdapter;
    return has(features, name)
  }

  private getFeature<T = any>(name: string): T {
    const {features} = this.standardWalletAdapter;
    if (!has(features, name)) {
      throw new WalletNotImplementError(name);
    }
    return (features as any)[name];
  }
}
