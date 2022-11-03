import {WalletAccount} from "@mysten/wallet-standard";

export type ExpSignMessageApiVersion = "1.0.0";

/**
 * An experimental feature for signing a message
 */
export type ExpSignMessageFeature = {
  /** Namespace for the feature. */
  "exp:signMessage": {
    /** Version of the feature API. */
    version: ExpSignMessageApiVersion;
    signMessage: ExpSignMessageMethod;
  };
};

export type ExpSignMessageInput = {
  account: WalletAccount;
  message: Uint8Array;
}
export type ExpSignMessageOutput = {
  message: Uint8Array;
}

export type ExpSignMessageMethod = (
  input: ExpSignMessageInput
) => Promise<ExpSignMessageOutput>;

/** Options for signing message. */
export interface ExpSignMessageOptions {}
