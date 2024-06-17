import { createContext, useContext } from "react";
import {
  Chain,
  ConnectionStatus,
  IWallet,
  IWalletAdapter,
  KitError,
  WalletEvent,
  WalletEventListeners,
} from "@suiet/wallet-sdk";
import {
  SuiReportTransactionEffectsInput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignPersonalMessageInput,
  SuiSignPersonalMessageOutput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockOutput,
  SuiSignTransactionInput,
  WalletAccount,
  SignedTransaction,
} from "@mysten/wallet-standard";
import {
  ExecuteTransactionOptions,
  ExecuteTransactionResult,
} from "../types/params";

export interface WalletContextState {
  configuredWallets: IWallet[];
  detectedWallets: IWallet[];
  allAvailableWallets: IWallet[];
  chains: Chain[];
  chain: Chain | undefined;
  name: string | undefined; // name of the connected wallet
  adapter: IWalletAdapter | undefined; // adapter provided by the connected wallet
  account: WalletAccount | undefined; // current account (the first account of accounts)
  address: string | undefined; // alias for account.address
  connecting: boolean;
  connected: boolean;
  status: "disconnected" | "connected" | "connecting";
  select: (walletName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getAccounts: () => readonly WalletAccount[];

  signAndExecuteTransaction<Output extends SuiSignAndExecuteTransactionOutput>(
    input: Omit<SuiSignAndExecuteTransactionInput, "account" | "chain">,
    options?: ExecuteTransactionOptions
  ): Promise<Output>;

  signTransaction(
    input: Omit<SuiSignTransactionInput, "account" | "chain">
  ): Promise<SignedTransaction>;

  signPersonalMessage(
    input: Omit<SuiSignPersonalMessageInput, "account">
  ): Promise<SuiSignPersonalMessageOutput>;

  /**
   * @deprecated use signTransaction instead
   * @param input
   */
  signTransactionBlock(
    input: Omit<SuiSignTransactionBlockInput, "account" | "chain">
  ): Promise<SuiSignTransactionBlockOutput>;

  /** @deprecated Use signAndExecuteTransaction instead  */
  signAndExecuteTransactionBlock(
    input: Omit<SuiSignAndExecuteTransactionBlockInput, "account" | "chain">
  ): Promise<SuiSignAndExecuteTransactionBlockOutput>;

  /**
   * @deprecated use signPersonalMessage instead
   */
  signMessage(
    input: Omit<SuiSignMessageInput, "account">
  ): Promise<SuiSignMessageOutput>;

  verifySignedMessage(
    input: SuiSignPersonalMessageOutput | SuiSignMessageOutput,
    publicKey: Uint8Array
  ): Promise<boolean>;

  on: <E extends WalletEvent>(
    event: E,
    listener: WalletEventListeners[E]
  ) => () => void;

  reportTransactionEffects(
    input: Omit<SuiReportTransactionEffectsInput, "account" | "chain">
  ): Promise<void>;
}

function missProviderMessage(action: string) {
  return `Failed to call ${action}, missing context provider to run within`;
}

const DEFAULT_CONTEXT: WalletContextState = {
  configuredWallets: [],
  detectedWallets: [],
  allAvailableWallets: [],
  chains: [],
  chain: undefined,
  name: undefined,
  adapter: undefined,
  connecting: false,
  connected: false,
  account: undefined,
  status: ConnectionStatus.DISCONNECTED,
  address: undefined,
  async select() {
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
  async signTransaction() {
    throw new KitError(missProviderMessage("signTransaction"));
  },
  async signAndExecuteTransaction() {
    throw new KitError(missProviderMessage("signAndExecuteTransaction"));
  },
  async signPersonalMessage() {
    throw new KitError(missProviderMessage("signPersonalMessage"));
  },
  async reportTransactionEffects() {
    throw new KitError(missProviderMessage("reportTransactionEffects"));
  },
  verifySignedMessage() {
    throw new KitError(missProviderMessage("verifySignedMessage"));
  },
  async signMessage() {
    throw new KitError(missProviderMessage("signMessage"));
  },
  async signTransactionBlock() {
    throw new KitError(missProviderMessage("signTransactionBlock"));
  },
  async signAndExecuteTransactionBlock() {
    throw new KitError(missProviderMessage("signAndExecuteTransactionBlock"));
  },
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
