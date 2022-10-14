import type { WalletAdapter } from '@mysten/wallet-adapter-base';

/** Input for signing a message. */
export type SignMessageInput = Readonly<{
  /** Message to sign, as raw bytes. */
  message: Uint8Array;
}>;

/** Output of signing a message. */
export type SignMessageOutput = Readonly<{
  /** TODO: docs */
  signedMessage: Uint8Array;

  /** TODO: docs */
  signature: Uint8Array;
}>;

interface ExtendsAdapter extends WalletAdapter {
  signMessage?: (input: SignMessageInput) => Promise<SignMessageOutput>;
}

interface KitAdapter {
  adapter: ExtendsAdapter;
}

export interface Wallet {
  installed: boolean | undefined;
  name: string;
  iconUrl: string | (() => Promise<string>);
  downloadUrl?: {
    browserExtension?: string; // chrome default
  };
  createAdapter: () => KitAdapter;
}

export type WalletList = {
  wallets: Wallet[];
}[];

export type WalletInstance = Omit<Wallet, 'createAdapter'> &
  ReturnType<Wallet['createAdapter']> & {
    index: number;
    group: string;
  };
