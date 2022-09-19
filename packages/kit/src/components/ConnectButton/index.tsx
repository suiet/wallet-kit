import React, { useEffect, useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { ConnectWalletModal } from '../Modal/ConnectWalletModal';
import styles from './style/index.module.scss';

interface ConnectButtonProps {
  label?: string;
}

export function addressEllipsis(address: string) {
  // 0x0000000000000000000000000000000000000000 40bits / 42 length
  if (!address || !address.startsWith('0x') || address.length !== 42)
    return address;

  return address.slice(0, 7) + '....' + address.slice(-4, address.length);
}

export function ConnectButton({
  label = 'Connect Wallet',
}: ConnectButtonProps) {
  const {
    select,
    wallet: connectedWallet,
    connecting,
    connected,
    groupWallets,
    disconnect,
  } = useWallet();
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
      <>
        <div className={styles['connected-container']}>
          <button
            className={styles['connected-button']}
            onClick={() => {
              setShowConnectedModal(!showConnectedModal);
            }}
          >
            {addressEllipsis(account)}
            <span className={styles['right-arrow']} />
          </button>
          {showConnectedModal && (
            <div
              className={styles['connected-modal']}
              onClick={() => {
                setShowConnectedModal(false);
                disconnect();
              }}
            >
              Disconnect
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <ConnectWalletModal
      walletGroups={groups}
      onWalletClick={(wallet) => {
        if (!wallet.installed) return;
        select(wallet.adapter.name);
      }}
    >
      <button className={styles.button}>{label}</button>
    </ConnectWalletModal>
  );
}
