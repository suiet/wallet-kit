import { createContext, useContext } from "react";
import {ConnectionStatus, IWallet, IWalletAdapter} from "../types/wallet";
import { KitError } from "../errors";
import {
  WalletAccount,
} from "@mysten/wallet-standard";
import {WalletEvent, WalletEventListeners} from "../types/events";
import {Chain} from "../types/chain";
import {
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput
} from "../wallet-standard/features/suiSignAndExecuteTransaction";
import {SuiSignMessageOutput} from "../wallet-standard/features/suiSignMessage";
import {Transaction} from "@mysten/sui.js";
import {SuiSignTransactionOutput} from "../wallet-standard";

export interface WalletContextState {
  configuredWallets: IWallet[];
  detectedWallets: IWallet[];
  allAvailableWallets: IWallet[];
  chains: Chain[];
  chain: Chain | undefined;
  name: string | undefined;  // name of the connected wallet
  adapter: IWalletAdapter | undefined;  // adapter provided by the connected wallet
  account: WalletAccount | undefined; // current account (the first account of accounts)
  address: string | undefined;  // alias for account.address
  connecting: boolean;
  connected: boolean;
  status: "disconnected" | "connected" | "connecting";
  select: (walletName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getAccounts: () => readonly WalletAccount[];

  signAndExecuteTransaction(
    transaction: SuiSignAndExecuteTransactionInput
  ): Promise<SuiSignAndExecuteTransactionOutput>;

  signMessage(input: {message: Uint8Array}): Promise<SuiSignMessageOutput>;

  signTransaction(input: {transaction: Transaction}): Promise<SuiSignTransactionOutput>;

  on: <E extends WalletEvent>(
    event: E,
    listener: WalletEventListeners[E],
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
  async signAndExecuteTransaction() {
    throw new KitError(missProviderMessage("signAndExecuteTransaction"));
  },
  async signMessage() {
    throw new KitError(missProviderMessage("signMessage"));
  },
  async signTransaction() {
    throw new KitError(missProviderMessage("signTransaction"));
  }
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
