import classnames from 'classnames';
import React, { CSSProperties, useState } from 'react';
import { useAccountBalance } from '../../hooks/useAccountBalance';
import { useWallet } from '../../hooks/useWallet';
import { Extendable } from '../../types';
import { addressEllipsis } from '../../utils/addressEllipsis';
import { formatCurrency } from '../../utils/formatCurrency';
import './index.scss';

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
    <div
      className={classnames("wkit-connected-container", props.className)}
      style={props.style}
    >
      <button
        className={classnames("wkit-connected-button", props.btnClassName)}
        style={props.btnStyle}
        onClick={() => {
          setShowConnectedModal(!showConnectedModal);
        }}
      >
        <span className={"wkit-connected-button__balance"}>
          {formatCurrency(balance)} SUI
        </span>
        <div className={"wkit-connected-button__divider"}></div>
        <div className={"wkit-address-select"}>
          <span className={"wkit-address-select__address"}>
            {addressEllipsis(address)}
          </span>
          <span className={"wkit-address-select__right-arrow"} />
        </div>
      </button>
      {showConnectedModal && (
        <div
          className={"wkit-connected-modal"}
          onClick={() => {
            setShowConnectedModal(false);
            disconnect();
          }}
        >
          <span className={"wkit-connected-modal__text"}>Disconnect</span>
        </div>
      )}
    </div>
  );
}

export default WalletInfo;
