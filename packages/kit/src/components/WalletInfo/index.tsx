import classnames from 'classnames';
import React, { CSSProperties, useState } from 'react';
import { useAccountBalance } from '../../hooks/useAccountBalance';
import { useWallet } from '../../hooks/useWallet';
import { Extendable } from '../../types';
import { addressEllipsis } from '../../utils/addressEllipsis';
import { formatCurrency } from '../../utils/formatCurrency';
import styles from './index.module.scss';

export type ConnectButtonProps = Extendable & {
  label?: string;
  btnClassName?: string;
  btnStyle?: CSSProperties;
};

function WalletInfo(props: ConnectButtonProps) {
  const { disconnect, address } = useWallet();

  const { balance } = useAccountBalance();
  const [showConnectedModal, setShowConnectedModal] = useState(false);
  return (
    <div className={classnames(styles['connected-container'], props.className)}>
      <button
        className={classnames(styles['connected-button'], props.btnClassName)}
        style={props.btnStyle}
        onClick={() => {
          setShowConnectedModal(!showConnectedModal);
        }}
      >
        <span className={styles['balance']}>{formatCurrency(balance)} SUI</span>
        <div className={styles['divider']}></div>
        <div className={styles['address-select']}>
          <span className={styles['address']}>{addressEllipsis(address)}</span>
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

export default WalletInfo;
