import React, { CSSProperties, useEffect, useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { ConnectWalletModal } from '../Modal/ConnectWalletModal';
import styles from './style/index.module.scss';
import { Extendable } from '../../types';
import classnames from 'classnames';
import { useAccountBalance } from '../../hooks/useAccountBalance';

export type ConnectButtonProps = Extendable & {
  label?: string;
  btnClassName?: string;
  btnStyle?: CSSProperties;
};

export function addressEllipsis(address: string) {
  // 0x0000000000000000000000000000000000000000 40bits / 42 length
  if (!address || !address.startsWith('0x') || address.length !== 42)
    return address;

  return address.slice(0, 7) + '....' + address.slice(-4, address.length);
}

export function ConnectButton(props: ConnectButtonProps) {
  const { label = 'Connect Wallet' } = props;

  const {
    select,
    wallet: connectedWallet,
    connecting,
    connected,
    groupWallets,
    disconnect,
  } = useWallet();

  const { balance } = useAccountBalance();
  const [account, setAccount] = useState('');
  const [showConnectedModal, setShowConnectedModal] = useState(false);
  const groups = Object.entries(groupWallets).sort((wa, wb) => {
    if (wa[0] === 'Recent') return -1;
    if (wa[0] === 'Popular') return -1;
    return wa[0] > wb[0] ? -1 : 1;
  });

  useEffect(() => {
    if (connected) {
      connectedWallet?.adapter.getAccounts().then((accounts) => {
        const account = accounts[0];
        setAccount(account);
      });
    }
  }, [connected]);

  if (account && connected) {
    return (
      <div
        className={classnames(styles['connected-container'], props.className)}
        style={props.style}
      >
        <button
          className={classnames(styles['connected-button'], props.btnClassName)}
          style={props.btnStyle}
          onClick={() => {
            setShowConnectedModal(!showConnectedModal);
          }}
        >
          <span className={styles['balance']}>{balance} SUI</span>
          <div className={styles['divider']}></div>
          <div className={styles['address-select']}>
            <span className={styles['address']}>
              {addressEllipsis(account)}
            </span>
            <span className={styles['right-arrow']} />
          </div>
        </button>
        {showConnectedModal && (
          <div
            className={styles['connected-modal']}
            onClick={() => {
              setShowConnectedModal(false);
              disconnect();
            }}
          >
            <span className={styles['connected-modal__text']}>Disconnect</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <ConnectWalletModal
      walletGroups={groups}
      onWalletClick={(wallet) => {
        console.log(wallet.installed);
        if (!wallet.installed) return;
        select(wallet.name);
      }}
    >
      <button
        className={classnames(styles.button, props.btnClassName)}
        style={props.btnStyle}
      >
        {label}
      </button>
    </ConnectWalletModal>
  );
}
