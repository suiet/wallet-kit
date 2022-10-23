import { SignableTransaction } from '@mysten/sui.js';
import { WalletAdapter } from '@mysten/wallet-adapter-base';
import type { WalletWithFeatures } from '@wallet-standard/standard';
import type {
  ConnectFeature,
  DisconnectFeature,
  EventsFeature,
} from '@wallet-standard/features';
import { SuiSignAndExecuteTransactionFeature } from './features/SignAndExecuteTransactionFeature';

export type StandardWallet = WalletWithFeatures<
  ConnectFeature &
    EventsFeature &
    SuiSignAndExecuteTransactionFeature &
    // Disconnect is an optional feature:
    Partial<DisconnectFeature>
>;

export interface StandardWalletAdapterConfig {
  wallet: StandardWallet;
}

export class StandardWalletAdapter implements WalletAdapter {
  connected = false;
  connecting = false;

  #wallet: StandardWallet;

  constructor({ wallet }: StandardWalletAdapterConfig) {
    this.#wallet = wallet;
  }

  get name() {
    return this.#wallet.name;
  }

  get icon() {
    return this.#wallet.icon;
  }

  get wallet() {
    return this.#wallet;
  }

  async getAccounts() {
    return this.#wallet.accounts.map((account) => account.address);
  }

  async connect() {
    try {
      if (this.connected || this.connecting) return;
      this.connecting = true;

      if (!this.#wallet.accounts.length) {
        await this.#wallet.features['standard:connect'].connect();
      }

      if (!this.#wallet.accounts.length) {
        throw new Error('No wallet accounts found');
      }

      this.connected = true;
    } finally {
      this.connecting = false;
    }
  }

  async disconnect() {
    this.connected = false;
    this.connecting = false;
    if (this.#wallet.features['standard:disconnect']) {
      await this.#wallet.features['standard:disconnect'].disconnect();
    }
  }

  async signAndExecuteTransaction(transaction: SignableTransaction) {
    return this.#wallet.features[
      'sui:signAndExecuteTransaction'
    ].signAndExecuteTransaction({
      transaction,
    });
  }
}
