import { Wallet, WalletInstance, WalletList } from './KitAdapter';
import { sui } from './sui';
import { suiet } from './suiet';

interface WalletListItem extends Wallet {
  index: number;
  group: string;
}

function adapterInstance(walletList: WalletList) {
  const newWallets: WalletInstance[] = [];
  let index = -1;

  const walletItemList: WalletListItem[] = [];

  walletList.forEach(({ group, wallets }) => {
    wallets.forEach((wallet) => {
      index++;

      const walletListItem = {
        ...wallet,
        group,
        index,
      };

      walletItemList.push(walletListItem);
    });
  });

  walletItemList.forEach(({ createAdapter, group, name, index, ...rest }) => {
    const { adapter } = createAdapter();

    const walletInstance: WalletInstance = {
      adapter,
      group,
      name,
      index,
      ...rest,
    };

    newWallets.push(walletInstance);
  });

  return newWallets;
}

export function getDefaultWallets() {
  const wallets: WalletList = [
    {
      group: 'Popular',
      wallets: [sui()],
    },
  ];

  return adapterInstance(wallets);
}

export function getAllWallets() {
  const wallets: WalletList = [
    {
      group: 'Popular',
      wallets: [suiet()],
    },
    {
      group: 'Popular',
      wallets: [sui()],
    },
  ];

  return adapterInstance(wallets);
}
