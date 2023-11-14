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
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignPersonalMessageInput,
  SuiSignPersonalMessageOutput,
  SuiSignTransactionBlockInput,
  SuiSignTransactionBlockOutput,
  WalletAccount,
} from "@mysten/wallet-standard";

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

  signAndExecuteTransactionBlock(
    input: Omit<SuiSignAndExecuteTransactionBlockInput, "account" | "chain">
  ): Promise<SuiSignAndExecuteTransactionBlockOutput>;

  signTransactionBlock(
    input: Omit<SuiSignTransactionBlockInput, "account" | "chain">
  ): Promise<SuiSignTransactionBlockOutput>;

  signPersonalMessage(
    input: Omit<SuiSignPersonalMessageInput, "account">
  ): Promise<SuiSignPersonalMessageOutput>;

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
  async signAndExecuteTransactionBlock() {
    throw new KitError(missProviderMessage("signAndExecuteTransactionBlock"));
  },
  async signTransactionBlock() {
    throw new KitError(missProviderMessage("signTransactionBlock"));
  },
  async signPersonalMessage() {
    throw new KitError(missProviderMessage("signPersonalMessage"));
  },
  async signMessage() {
    throw new KitError(missProviderMessage("signMessage"));
  },
  verifySignedMessage() {
    throw new KitError(missProviderMessage("verifySignedMessage"));
  },
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
