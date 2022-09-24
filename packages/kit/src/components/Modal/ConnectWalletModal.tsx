import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { WalletInstance } from '../../adapter/KitAdapter';
import styles from './index.module.scss';
import Icon from '../Icon';

interface ModalProps {
  children: ReactNode;
  title: string;
  content: ReactNode;
}

function Modal({ children, content, title }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles['overlay']}>
          <Dialog.Content className={styles['content']}>
            <div className={styles.header}>
              <Dialog.Title className={styles['title']}>{title}</Dialog.Title>
              <Dialog.Close className={styles['close']}></Dialog.Close>
            </div>
            {content}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface ConnectWalletModalProps {
  groupWallets: Record<string, WalletInstance[]>;
  children: ReactNode;
  onWalletClick: (wallet: WalletInstance) => any;
}

export function ConnectWalletModal({
  groupWallets,
  children,
  onWalletClick,
}: ConnectWalletModalProps) {
  const groups = Object.entries(groupWallets).sort((wa, wb) => {
    if (wa[0] === 'Recent') return -1;
    if (wa[0] === 'Popular') return -1;
    return wa[0] > wb[0] ? -1 : 1;
  });
  return (
    <Modal
      title="Connect Wallet"
      content={groups.map(([group, wallets]) => {
        if (wallets.length === 0) return null;
        return (
          <div className={styles['select-container']} key={group}>
            <div className={styles['select-title']}>{group}</div>
            {wallets.map((wallet) => {
              return (
                <div
                  className={styles['select-item']}
                  key={wallet.name}
                  onClick={() => onWalletClick(wallet)}
                >
                  <Icon
                    icon={wallet.iconUrl}
                    className={styles['select-item__icon']}
                    elClassName={styles['select-item__icon']}
                  />
                  {wallet?.name}
                </div>
              );
            })}
          </div>
        );
      })}
    >
      {children}
    </Modal>
  );
}
