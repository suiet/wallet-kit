import React, { CSSProperties, ReactNode } from 'react';
import { useWallet } from '../../hooks/useWallet';
import './index.scss';
import { ConnectWalletModal } from '../Modal/ConnectWalletModal';
import { Extendable } from '../../types';
import classnames from 'classnames';
import WalletInfo from '../WalletInfo';

export type ConnectButtonProps = Extendable & {
  label?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function ConnectButton(props: ConnectButtonProps) {
  const { label = 'Connect Wallet', children } = props;

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
        className={classnames('wkit-button', props.className)}
        style={props.style}
      >
        {children || label}
      </button>
    </ConnectWalletModal>
  );
}
