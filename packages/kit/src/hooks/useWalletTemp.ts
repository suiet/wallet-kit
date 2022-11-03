import { createContext, useContext } from "react";
import { ConnectionStatus, IWalletAdapter } from "../types/wallet";
import { KitError } from "../errors";
import {
  ConnectInput,
  ConnectOutput,
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput,
  WalletAccount,
} from "@mysten/wallet-standard";
import {ExpSignMessageOutput} from "../wallet-standard/features/exp_sign-message";

export interface WalletContextState {
  // availableWallets: IWalletAdapter[];
  wallet: IWalletAdapter | undefined; // wallet currently connected to
  account: WalletAccount | undefined; // current account (the first account of accounts)

  connecting: boolean;
  connected: boolean;
  status: "disconnected" | "connected" | "connecting";

  select: (walletName: string) => void;
  connect: (
    wallet: IWalletAdapter,
    opts?: ConnectInput
  ) => Promise<ConnectOutput>;
  disconnect: () => Promise<void>;
  getAccounts: () => readonly WalletAccount[];

  signAndExecuteTransaction(
    transaction: SuiSignAndExecuteTransactionInput
  ): Promise<SuiSignAndExecuteTransactionOutput>;

  // simplify SignMessageInput for users
  signMessage: (message: Uint8Array) => Promise<ExpSignMessageOutput>;
}

function missProviderMessage(action: string) {
  return `Failed to call ${action}, missing context provider to run within`;
}

const DEFAULT_CONTEXT: WalletContextState = {
  wallet: undefined,
  connecting: false,
  connected: false,
  account: undefined,
  status: ConnectionStatus.DISCONNECTED,
  select() {
    throw new KitError(missProviderMessage("select"));
  },
  async connect() {
    throw new KitError(missProviderMessage("connect"));
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
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
