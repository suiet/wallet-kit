import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { WalletInstance } from '../../adapter/KitAdapter';
import './index.scss';
import closeIcon from './close.svg';
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
        <Dialog.Overlay className={"wkit-dialog__overlay"}>
          <Dialog.Content className={"wkit-dialog__content"}>
            <div className={"wkit-dialog__header"}>
              <Dialog.Title className={"wkit-dialog__title"}>{title}</Dialog.Title>
              <Dialog.Close className={"wkit-dialog__close"}>
                <img
                  src={closeIcon}
                  alt="X"
                  draggable={false}
                />
              </Dialog.Close>
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
      content={
        <div style={{ paddingBottom: "41px" }}>
          {groups.map(([group, wallets]) => {
            if (wallets.length === 0) return null;
            return (
              <div className={"wkit-select__container"} key={group}>
                <div className={"wkit-select__title"}>{group}</div>
                {wallets.map((wallet) => {
                  return (
                    <div
                      className={"wkit-select-item"}
                      key={wallet.name}
                      onClick={() => onWalletClick(wallet)}
                    >
                      <Icon
                        icon={wallet.iconUrl}
                        className={"wkit-select-item__icon"}
                        elClassName={"wkit-select-item__icon"}
                      />
                      {wallet?.name}
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className={"wkit-new-to-sui"}>
            <span className={"wkit-new-to-sui__text"}>New to sui? </span>
            <a
              className={"wkit-new-to-sui__link"}
              href="https://suiet.app/docs/getting-started"
              target="_blank"
            >
              Learn More Here
            </a>
          </div>
        </div>
      }
    >
      {children}
    </Modal>
  );
}
