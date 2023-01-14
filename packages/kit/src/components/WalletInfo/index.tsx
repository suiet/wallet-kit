import classnames from 'classnames';
import React, {useCallback, useState} from 'react';
import './index.scss';
import { useWallet } from '../../hooks/useWallet';
import { Extendable } from '../../types/utils';
import { addressEllipsis } from "../../utils/addressEllipsis";
import { formatCurrency } from '../../utils/formatCurrency';
import { SvgArrowDown } from '../Icon/SvgIcons';
import type {WalletAccount} from "@mysten/wallet-standard";
import {useAccountBalance} from "../../hooks";
import {UnknownChain} from "../../chain/constants";

export type ConnectButtonProps = Extendable & {
  label?: string;
  onDisconnect?: () => void;
};

function WalletInfo(props: ConnectButtonProps) {
  const { disconnect, account, chain, connected } = useWallet();
  const { balance } = useAccountBalance();
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);

  const renderBalance = useCallback(() => {
    if (!chain || chain.id === UnknownChain.id) {
      return <>Unknown Chain</>
    }
    // TODO: formatCurrency supports bigint
    return <>{formatCurrency(Number(balance))} SUI</>
  }, [balance, chain])

  if (!connected) return null;
  return (
    <div className={classnames("wkit-connected-container")}>
      <button
        className={classnames("wkit-connected-button")}
        onClick={() => {
          setShowDisconnectButton(!showDisconnectButton);
        }}
      >
        <span className={"wkit-connected-button__balance"}>
          {renderBalance()}
        </span>
        <div className={"wkit-connected-button__divider"}></div>
        <div className={"wkit-address-select"}>
          <span className={"wkit-address-select__address"}>
            {addressEllipsis((account as WalletAccount)?.address)}
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
