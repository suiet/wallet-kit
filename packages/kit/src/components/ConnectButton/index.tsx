import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import Modal from '../Modal/ConnectWalletModal';
import styles from './style/index.module.scss';

interface ConnectButtonProps {
  label?: string;
}

function ConnectButton({ label = 'Connect Wallet' }: ConnectButtonProps) {
  const { connected, getAccounts, executeMoveCall } = useWallet();
  const { supportedWallets, wallet, select, connecting } = useWallet();

  return (
    <Modal
      title="Connect Wallet"
      trigger={<button className={styles.button}>{label}</button>}
    >
      <div>
        <div className={styles['select-title']}>Popular</div>
        <div className={styles['select-item']}>
          <span />
          Suiet
        </div>
        <div
          className={styles['select-item']}
          onClick={async () => {
            const wallet = supportedWallets[0];
            console.log(wallet.adapter.name);
            select(wallet.adapter.name);
            const accounts = await getAccounts();
            console.log(accounts);
            console.log(connected);
          }}
        >
          {' '}
          <span />
          Sui Wallet
        </div>
      </div>
    </Modal>
  );
}

export default ConnectButton;
