// import type { WalletAdapter } from '@mysten/wallet-adapter-base';
import { StandardWalletAdapter } from '../standard/WalletStandard';

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

// interface ExtendsAdapter extends WalletAdapter {
//   signMessage?: (input: SignMessageInput) => Promise<SignMessageOutput>;
//   getPublicKey?: () => Promise<string>;
// }

// interface KitAdapter {
//   adapter: ExtendsAdapter;
// }

export interface Wallet {
  installed: boolean | undefined;
  name: string;
  iconUrl: string | (() => Promise<string>);
  downloadUrl?: {
    browserExtension?: string; // chrome default
  };
}

export type WalletList = {
  wallets: Wallet[];
}[];

export type WalletInstance = Omit<Wallet, 'createAdapter'> & {
  index: number;
  group: string;
  // _adapter?: ExtendsAdapter;
  adapter?: StandardWalletAdapter;
};
