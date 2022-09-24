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

  if (connected) {
    return <WalletInfo />;
  }

  return (
    <ConnectWalletModal
      groupWallets={groupWallets}
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
