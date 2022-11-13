import type { InitializedWallets } from '@wallet-standard/app';
import mitt, { Emitter } from 'mitt';
import {isStandardWalletAdapterCompatibleWallet, Wallet} from '@mysten/wallet-standard';
import { StandardWalletAdapter } from './WalletStandard';
import { DEPRECATED_getWallets } from './initialize';

type Events = {
  changed: { wallets: readonly Wallet[] };
};

export class WalletContainer {
  #wallets: InitializedWallets;
  #adapters: Map<string, StandardWalletAdapter>;
  #events: Emitter<Events>;

  constructor() {
    this.#adapters = new Map();
    this.#wallets = DEPRECATED_getWallets();
    this.#events = mitt<Events>();
    console.log('this.#wallets', this.#wallets.get())
    this.#wallets.on('register', (...wallets) => {
      console.log('register', { wallets })
      this.#events.emit('changed', { wallets });
    });

    // this.#wallets.on('unregister', (...wallets) => {
    //   this.#events.emit('changed', { wallets });
    // });
  }

  get() {
    const filtered = this.#wallets
      .get()
      .filter(isStandardWalletAdapterCompatibleWallet);

    filtered.forEach((wallet) => {
      if (!this.#adapters.has(wallet.name)) {
        this.#adapters.set(wallet.name, new StandardWalletAdapter({ wallet }));
      }
    });

    return [...this.#adapters.values()];
  }

  on<T extends keyof Events>(
    eventName: T,
    callback: (data: Events[T]) => void
  ) {
    this.#events.on(eventName, callback);
    return () => {
      this.#events.off(eventName, callback);
    };
  }
}
