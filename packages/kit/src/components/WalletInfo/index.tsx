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
};

function WalletInfo(props: ConnectButtonProps) {
  const { disconnect, address } = useWallet();

  const { balance } = useAccountBalance();
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  return (
    <div className={classnames("wkit-connected-container")}>
      <button
        className={classnames("wkit-connected-button")}
        onClick={() => {
          setShowDisconnectButton(!showDisconnectButton);
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
          <span className={"wkit-address-select__right-arrow"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1790_28273)">
                <path
                  d="M9.99989 10.9766L14.1249 6.85156L15.3032 8.0299L9.99989 13.3332L4.69656 8.0299L5.87489 6.85156L9.99989 10.9766Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_1790_28273">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(20) rotate(90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
      </button>
      {showDisconnectButton && (
        <div
          className={"wkit-disconnect-button"}
          onClick={() => {
            setShowDisconnectButton(false);
            disconnect();
          }}
        >
          <span className={"wkit-disconnect-button__text"}>Disconnect</span>
        </div>
      )}
    </div>
  );
}

export default WalletInfo;
