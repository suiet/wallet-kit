import * as React from 'react';
import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import type { DialogProps } from '@radix-ui/react-dialog';

import './index.scss';
import { WalletInstance } from '../../adapter/KitAdapter';
import Icon from '../Icon';
import { SvgArrowLeft, SvgClose } from '../Icon/SvgIcons';
import { useWallet } from '../../hooks';

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

  const [open, setOpen] = React.useState(false);
  const [selectedWallet, setSelectedWallet] = React.useState<WalletInstance>();
  const [realIconUrl, setRealIconUrl] = React.useState<string>();
  const { connecting, connected } = useWallet();

  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (contentRef.current) {
      const r = contentRef.current.getBoundingClientRect();
      setContentHeight(r.height);
    }
  }, [contentRef, contentRef.current]);

  React.useEffect(() => {
    if (typeof selectedWallet?.iconUrl === 'function') {
      selectedWallet?.iconUrl().then((url) => {
        setRealIconUrl(url);
      });
    } else if (typeof selectedWallet?.iconUrl === 'string') {
      setRealIconUrl(selectedWallet?.iconUrl);
    }
  }, [selectedWallet]);

  if (connected) {
    return null;
  }

  if (selectedWallet) {
    if (selectedWallet.installed) {
      if (connecting) {
        return (
          <Dialog.Root open={open}>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className={'wkit-dialog__overlay'}>
                <Dialog.Content
                  className={'wkit-dialog__content'}
                  style={{
                    minHeight: `${contentHeight}px`,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className={'wkit-dialog__header'}>
                    <Dialog.Title
                      className={'wkit-dialog__title'}
                      style={{ margin: '-6px 12px -6px -8px' }}
                    >
                      <span
                        className="wkit-dialog__close"
                        onClick={() => setSelectedWallet(undefined)}
                      >
                        <SvgArrowLeft />
                      </span>
                    </Dialog.Title>

                    <Dialog.Title className={'wkit-dialog__title'}>
                      Connecting
                    </Dialog.Title>
                  </div>
                  <div className="wkit-connecting">
                    <img
                      className="wkit-connecting__logo"
                      src={realIconUrl}
                      alt={`logo of ${selectedWallet.name}`}
                    />
                    <h1 className="wkit-connecting__title">
                      Opening {selectedWallet.name}
                    </h1>
                    <p className="wkit-connecting__description">
                      Confirm connection in the extension
                    </p>
                  </div>
                </Dialog.Content>
              </Dialog.Overlay>
            </Dialog.Portal>
          </Dialog.Root>
        );
      }
    } else {
      return (
        <Dialog.Root open={open}>
          <Dialog.Trigger asChild>{children}</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={'wkit-dialog__overlay'}>
              <Dialog.Content
                className={'wkit-dialog__content'}
                style={{
                  minHeight: `${contentHeight}px`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className={'wkit-dialog__header'}>
                  <Dialog.Title
                    className={'wkit-dialog__title'}
                    style={{ margin: '-8px 12px -6px -8px' }}
                  >
                    <span
                      className="wkit-dialog__close"
                      onClick={() => setSelectedWallet(undefined)}
                    >
                      <SvgArrowLeft />
                    </span>
                  </Dialog.Title>

                  <Dialog.Title className={'wkit-dialog__title'}>
                    Install Wallet
                  </Dialog.Title>
                </div>
                <div className="wkit-install">
                  <img
                    className="wkit-install__logo"
                    src={realIconUrl}
                    alt={`logo of ${selectedWallet.name}`}
                  />
                  <h1 className="wkit-install__title">
                    You haven’t install this wallet
                  </h1>
                  <p className="wkit-install__description">
                    Install wallet via Chrome Extension Store
                  </p>
                  <button
                    className="wkit-button wkit-install__button"
                    onClick={() => {
                      if (selectedWallet.downloadUrl) {
                        if (selectedWallet.downloadUrl.browserExtension) {
                          window.open(
                            selectedWallet.downloadUrl.browserExtension,
                            '_blank'
                          );
                        }
                        // else if (selectedWallet.downloadUrl.mobile) {
                        //   window.open(
                        //     selectedWallet.downloadUrl.mobile,
                        //     "_blank"
                        //   );
                        // }
                      }
                    }}
                  >
                    Get Wallet
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      );
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={'wkit-dialog__overlay'}>
          <Dialog.Content className={'wkit-dialog__content'} ref={contentRef}>
            <div className={'wkit-dialog__header'}>
              <Dialog.Title className={'wkit-dialog__title'}>
                {'Connect Wallet'}
              </Dialog.Title>
              <Dialog.Close
                style={{ position: 'absolute', right: '16px', top: '16px' }}
                className={'wkit-dialog__close'}
              >
                <SvgClose />
              </Dialog.Close>
            </div>
            <div className="wkit-select__scroll">
              {groups.map(([group, wallets]) => {
                if (wallets.length === 0) return null;
                return (
                  <div className={'wkit-select__container'} key={group}>
                    <div className={'wkit-select__title'}>{group}</div>
                    {wallets.map((wallet) => {
                      return (
                        <div
                          className={'wkit-select-item'}
                          key={wallet.name}
                          onClick={() => {
                            if (contentRef.current) {
                              const r =
                                contentRef.current.getBoundingClientRect();
                              setContentHeight(r.height);
                            }

                            onWalletClick(wallet);
                            if (wallet.installed) {
                              setTimeout(() => {
                                // Delay 300 ms to avoid flashing
                                // You may see React warning about updating state after unmounting
                                // I think it's ok to ignore it
                                // TODO(hzy): Find a better way to avoid flashing
                                setSelectedWallet(wallet);
                              }, 300);
                            } else {
                              setSelectedWallet(wallet);
                            }
                          }}
                        >
                          <Icon
                            icon={wallet.iconUrl}
                            className={'wkit-select-item__icon'}
                            elClassName={'wkit-select-item__icon'}
                          />
                          {wallet?.name}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div style={{ height: '41px', flexShrink: '0' }}></div>
            <div className={'wkit-new-to-sui'}>
              <span className={'wkit-new-to-sui__text'}>New to sui? </span>
              <a
                className={'wkit-new-to-sui__link'}
                href="https://suiet.app/docs/getting-started"
                target="_blank"
              >
                Learn More Here
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
