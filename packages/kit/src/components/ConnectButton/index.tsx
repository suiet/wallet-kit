import React, { CSSProperties, ReactNode } from 'react';
import { useWallet } from '../../hooks/useWalletTemp';
import './index.scss';
import { ConnectWalletModal } from '../Modal/ConnectWalletModal';
import { Extendable } from '../../types';
import classnames from 'classnames';
import WalletInfo from '../WalletInfo';

export type ConnectButtonProps = Extendable & {
  label?: string;
  children?: ReactNode;
};

export function ConnectButton(props: ConnectButtonProps) {
  const { label = 'Connect Wallet', children } = props;

  const { select, connected, availableWalletAdapters } = useWallet();
  //
  // if (connected) {
  //   return <WalletInfo />;
  // }

  return (
    <ConnectWalletModal
      groupWallets={[]}
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

export default ConnectButton