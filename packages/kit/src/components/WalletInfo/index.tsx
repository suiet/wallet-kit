import classnames from 'classnames';
import React, { useState } from 'react';
import './index.scss';
import { useAccountBalance } from '../../hooks/useAccountBalance';
import { useWallet } from '../../hooks/useWallet';
import { Extendable } from '../../types/utils';
import { addressEllipsis } from "../../utils/addressEllipsis";
import { formatCurrency } from '../../utils/formatCurrency';
import { SvgArrowDown } from '../Icon/SvgIcons';
import {WalletAccount} from "@mysten/wallet-standard";

export type ConnectButtonProps = Extendable & {
  label?: string;
  onDisconnect?: () => void;
};

function WalletInfo(props: ConnectButtonProps) {
  const { disconnect, account } = useWallet();
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
            {addressEllipsis((account as WalletAccount).address)}
          </span>
          <span className={"wkit-address-select__right-arrow"}>
            <SvgArrowDown />
          </span>
        </div>
      </button>
      {showDisconnectButton && (
        <div className='wkit-disconnect-button__container'>
          <button
            className={"wkit-disconnect-button"}
            onClick={() => {
              setShowDisconnectButton(false);
              disconnect().then(() => {
                props.onDisconnect?.();
              });
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletInfo;
