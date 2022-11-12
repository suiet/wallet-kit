import {
  IWalletAdapter
} from "../types/wallet";
import {
  ConnectInput,
  ConnectMethod,
  ConnectOutput,
  DisconnectMethod,
  EventsListeners,
  EventsOnMethod,
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput,
  EventsNames,
  SuiSignAndExecuteTransactionMethod,
  Wallet,
} from "@mysten/wallet-standard";
import {has} from "lodash-es";
import {WalletError, WalletNotImplementError} from "../errors";
import {
  ExpSignMessageInput,
  ExpSignMessageMethod,
  ExpSignMessageOutput
} from "../wallet-standard/features/exp_sign-message";

export enum FeatureName {
  STANDARD__CONNECT = "standard:connect",
  STANDARD__DISCONNECT = "standard:disconnect",
  STANDARD__EVENTS = "standard:events",
  SUI__SIGN_AND_TRANSACTION = "sui:signAndExecuteTransaction",
  EXP__SIGN_MESSAGE = "exp:signMessage",
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
      throw new WalletError((e as any).message)
    }
  }

  async disconnect(): Promise<void> {
    const feature = this.getFeature<{ disconnect: DisconnectMethod }>(
      FeatureName.STANDARD__DISCONNECT
    );
    try {
      return await feature.disconnect();
    } catch (e) {
      throw new WalletError((e as any).message)
    }
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
    try {
      feature.on<T>(event, listener);
    } catch (e) {
      throw new WalletError((e as any).message)
    }
  }

  async signAndExecuteTransaction(
    input: SuiSignAndExecuteTransactionInput
  ): Promise<SuiSignAndExecuteTransactionOutput> {
    const feature = this.getFeature<{
      signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
    }>(FeatureName.SUI__SIGN_AND_TRANSACTION);
    try {
      return await feature.signAndExecuteTransaction(input);
    } catch (e) {
      throw new WalletError((e as any).message)
    }
  }

  async signMessage(input: ExpSignMessageInput): Promise<ExpSignMessageOutput> {
    const feature = this.getFeature<{ signMessage: ExpSignMessageMethod }>(
      FeatureName.EXP__SIGN_MESSAGE
    );
    try {
      return await feature.signMessage(input);
    } catch (e) {
      throw new WalletError((e as any).message)
    }
  }

  private getFeature<T = any>(name: string): T {
    const {features} = this.standardWalletAdapter;
    if (!has(features, name)) {
      throw new WalletNotImplementError(name);
    }
    return (features as any)[name];
  }
}
