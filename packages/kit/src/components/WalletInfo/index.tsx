import classnames from 'classnames';
import React, {useCallback, useState} from 'react';
import './index.scss';
import { useWallet } from '../../hooks/useWallet';
import { Extendable } from '../../types/utils';
import { SvgArrowDown } from '../Icon/SvgIcons';
import type {WalletAccount} from "@mysten/wallet-standard";
import {useAccountBalance} from "../../hooks";
import {UnknownChain} from "../../chain/constants";
import {BaseError} from "../../errors";
import { formatSUI, addressEllipsis } from '@suiet/wallet-sdk';

export type ConnectButtonProps = Extendable & {
  label?: string;
  onDisconnectSuccess?: (walletName: string) => void;
  onDisconnectError?: (error: BaseError) => void;
};

function WalletInfo(props: ConnectButtonProps) {
  const { disconnect, account, chain, connected, name } = useWallet();
  const { balance } = useAccountBalance();
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);

  const renderBalance = useCallback(() => {
    if (!chain || chain.id === UnknownChain.id) {
      return <>Unknown Chain</>
    }
    // TODO: formatCurrency supports bigint
    return <>{formatSUI(balance ?? 0)} SUI</>
  }, [balance, chain])

  if (!connected) return null;
  return (
    <div
      className={classnames("wkit-connected-container", props.className)}
      style={props.style}
    >
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
            onClick={async () => {
              setShowDisconnectButton(false);
              try {
                await disconnect();
              } catch(e) {
                props?.onDisconnectError?.(e as BaseError);
                return;
              }
              props?.onDisconnectSuccess?.(name as string);
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
