import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { WalletInstance } from '../../adapter/KitAdapter';
import styles from './index.module.scss';

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
  walletGroups: [string, WalletInstance[]][];
  children: ReactNode;
  onWalletClick: (wallet: WalletInstance) => any;
}

export function ConnectWalletModal({
  walletGroups,
  children,
  onWalletClick,
}: ConnectWalletModalProps) {
  return (
    <Modal
      title="Connect Wallet"
      content={walletGroups.map(([group, wallets]) => {
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
                  <span />
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
