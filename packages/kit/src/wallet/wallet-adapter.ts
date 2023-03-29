import {IWalletAdapter} from "../types/wallet";
import {
  StandardConnectOutput,
  StandardEventsListeners,
  StandardEventsNames,
  StandardConnectInput,
  StandardConnectMethod,
  StandardDisconnectMethod,
  StandardEventsOnMethod,
  Wallet,
  SuiSignTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignTransactionBlockMethod,
  SuiSignTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignMessageMethod,

} from "@mysten/wallet-standard";
import {has} from "lodash-es";
import {ErrorCode, WalletError, WalletNotImplementError} from "../errors";
import {handleConnectionError} from "./wallet-error-handling";

export enum FeatureName {
  STANDARD__CONNECT = "standard:connect",
  STANDARD__DISCONNECT = "standard:disconnect",
  STANDARD__EVENTS = "standard:events",
  SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK = "sui:signAndExecuteTransactionBlock",
  SUI__SIGN_TRANSACTION_BLOCK = "sui:signTransactionBlock",
  SUI__SIGN_MESSAGE = "sui:signMessage",
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

  async connect(input: StandardConnectInput | undefined): Promise<StandardConnectOutput> {
    const feature = this.getFeature<{ connect: StandardConnectMethod }>(
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
    const feature = this.getFeature<{ disconnect: StandardDisconnectMethod }>(
      FeatureName.STANDARD__DISCONNECT
    );
    try {
      return await feature.disconnect();
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__DISCONNECT_ERROR)
    }
  }

  on(event: StandardEventsNames, listener: StandardEventsListeners[StandardEventsNames]): () => void {
    const feature = this.getFeature<{ on: StandardEventsOnMethod }>(
      FeatureName.STANDARD__EVENTS
    );
    try {
      return feature.on<StandardEventsNames>(event, listener);
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__LISTEN_TO_EVENT_ERROR)
    }
  }

  async signAndExecuteTransactionBlock(
    input: SuiSignAndExecuteTransactionBlockInput
  ): Promise<SuiSignAndExecuteTransactionBlockOutput> {
    const feature = this.getFeature<{
      signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
    }>(FeatureName.SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK);
    try {
      return await feature.signAndExecuteTransactionBlock(input);
    } catch (e) {
      throw new WalletError((e as any).message, ErrorCode.WALLET__SIGN_TX_ERROR)
    }
  }

  signTransactionBlock(input: SuiSignTransactionBlockInput): Promise<SuiSignTransactionBlockOutput> {
    const feature = this.getFeature<{
      signTransactionBlock: SuiSignTransactionBlockMethod;
    }>(FeatureName.SUI__SIGN_TRANSACTION_BLOCK);
    try {
      return feature.signTransactionBlock(input);
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
