import { SignableTransaction } from '@mysten/sui.js';
import type { StandardWalletAdapterWallet } from '@mysten/wallet-standard';

export interface StandardWalletAdapterConfig {
  wallet: StandardWalletAdapterWallet;
}

export class StandardWalletAdapter {
  connected = false;
  connecting = false;

  #wallet: StandardWalletAdapterWallet;

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

  get publicKey() {
    return this.#wallet.accounts.map((account) => {
      let publicKey = account.publicKey
      // FIXME: hack logic for suiet v0.1.23
      if (this.#wallet.name === 'Suiet' && publicKey.length === 49) {
        // revert from base64 buffer and convert to hex buffer
        // @ts-ignore
        const pkStr = publicKey.toString('base64')
        // publicKey = Buffer.from(pkStr.slice(2), 'hex')
        // TODO: public Key
        publicKey = new Uint8Array()
      }
      return {[account.address]: publicKey}
    });
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
