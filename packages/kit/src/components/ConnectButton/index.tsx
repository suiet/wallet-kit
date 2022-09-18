import React, { useEffect, useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import Modal from '../Modal/ConnectWalletModal';
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

function ConnectButton({ label = 'Connect Wallet' }: ConnectButtonProps) {
  const {
    supportedWallets,
    select,
    wallet: connectedWallet,
    connecting,
    connected,
    groupWallets,
  } = useWallet();
  const [account, setAccount] = useState('');

  const groups = Object.entries(groupWallets).sort((wa, wb) => {
    if (wa[0] === 'Recent') return -1;
    if (wa[0] === 'Popular') return -1;
    return wa[0] > wb[0] ? -1 : 1;
  });

  useEffect(() => {
    connectedWallet?.adapter.getAccounts().then((accounts) => {
      const account = accounts[0];
      setAccount(account);
    });
  }, [connected]);

  if (account && connected) {
    return (
      <button className={styles['connected-button']}>
        {addressEllipsis(account)}
        <span className={styles['right-arrow']} />
      </button>
    );
  }

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
                  onClick={async () => {
                    if (!wallet?.installed) return;
                    select(wallet.adapter.name);
                  }}
                >
                  {' '}
                  <span />
                  {wallet?.name}
                </div>
              );
            })}
          </div>
        );
      })}
    >
      <button className={styles.button}>{label}</button>
    </Modal>
  );
}

export default ConnectButton;
