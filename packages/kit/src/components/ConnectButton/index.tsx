import React, { CSSProperties } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { ConnectWalletModal } from '../Modal/ConnectWalletModal';
import styles from './style/index.module.scss';
import { Extendable } from '../../types';
import classnames from 'classnames';
import WalletInfo from '../WalletInfo';

export type ConnectButtonProps = Extendable & {
  label?: string;
  btnClassName?: string;
  btnStyle?: CSSProperties;
};

export function ConnectButton(props: ConnectButtonProps) {
  const { label = 'Connect Wallet' } = props;

  const { select, connected, groupWallets } = useWallet();

  const groups = Object.entries(groupWallets).sort((wa, wb) => {
    if (wa[0] === 'Recent') return -1;
    if (wa[0] === 'Popular') return -1;
    return wa[0] > wb[0] ? -1 : 1;
  });

  if (connected) {
    return <WalletInfo />;
  }

  return (
    <ConnectWalletModal
      walletGroups={groups}
      onWalletClick={(wallet) => {
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
