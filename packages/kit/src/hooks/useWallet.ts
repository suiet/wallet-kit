import { createContext, useContext } from "react";
import {ConnectionStatus, IWallet, IWalletAdapter} from "../types/wallet";
import { KitError } from "../errors";
import {
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput,
  WalletAccount,
} from "@mysten/wallet-standard";
import {ExpSignMessageOutput} from "../wallet-standard/features/exp_sign-message";
import {MoveCallTransaction} from "@mysten/sui.js/src/signers/txn-data-serializers/txn-data-serializer";
import {SuiTransactionResponse} from "@mysten/sui.js";
import {WalletEvent, WalletEventListeners} from "../types/events";

export interface WalletContextState {
  configuredWallets: IWallet[];
  detectedWallets: IWallet[];
  allAvailableWallets: IWallet[];
  name: string | undefined;  // name of the connected wallet
  adapter: IWalletAdapter | undefined;  // adapter provided by the connected wallet
  account: WalletAccount | undefined; // current account (the first account of accounts)
  connecting: boolean;
  connected: boolean;
  status: "disconnected" | "connected" | "connecting";
  select: (walletName: string) => void;
  disconnect: () => Promise<void>;
  getAccounts: () => readonly WalletAccount[];

  signAndExecuteTransaction(
    transaction: SuiSignAndExecuteTransactionInput
  ): Promise<SuiSignAndExecuteTransactionOutput>;

  signMessage: (input: {message: Uint8Array}) => Promise<ExpSignMessageOutput>;

  on: <E extends WalletEvent>(
    event: E,
    listener: WalletEventListeners[E],
  ) => () => void;

  /**
   * @deprecated use adapter instead
   */
  wallet: IWalletAdapter | undefined;
  /**
   * @deprecated use allAvailableWallets instead
   */
  supportedWallets: any[];
  /**
   * @deprecated use account.address instead
   */
  address: string | undefined;
  /**
   * @deprecated use signAndExecuteTransaction instead
   */
  executeMoveCall: (transaction: MoveCallTransaction) => Promise<SuiTransactionResponse>;
  /**
   * @deprecated use account.publicKey instea
   */
  getPublicKey: () => Promise<Uint8Array>;
}

function missProviderMessage(action: string) {
  return `Failed to call ${action}, missing context provider to run within`;
}

const DEFAULT_CONTEXT: WalletContextState = {
  configuredWallets: [],
  detectedWallets: [],
  allAvailableWallets: [],
  name: undefined,
  adapter: undefined,
  connecting: false,
  connected: false,
  account: undefined,
  status: ConnectionStatus.DISCONNECTED,
  wallet: undefined,
  address: undefined,
  supportedWallets: [],
  select() {
    throw new KitError(missProviderMessage("select"));
  },
  on() {
    throw new KitError(missProviderMessage("on"));
  },
  async disconnect() {
    throw new KitError(missProviderMessage("disconnect"));
  },
  getAccounts() {
    throw new KitError(missProviderMessage("getAccounts"));
  },
  async signAndExecuteTransaction() {
    throw new KitError(missProviderMessage("signAndExecuteTransaction"));
  },
  async signMessage() {
    throw new KitError(missProviderMessage("signMessage"));
  },
  async executeMoveCall() {
    throw new KitError(missProviderMessage("executeMoveCall"));
  },
  async getPublicKey() {
    throw new KitError(missProviderMessage("getPublicKey"));
  }
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
