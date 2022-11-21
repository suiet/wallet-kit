import React, {ReactNode, useEffect, useState} from 'react';
import classnames from "classnames";
import {Extendable} from "../../types/utils";
import ConnectModal from "../Modal/ConnectModal";
import {useWallet} from "../../hooks/useWallet";
import './index.scss';
import WalletInfo from "../WalletInfo";

export type ConnectButtonProps = Extendable & {
  label?: string;
  children?: ReactNode;
};

export const ConnectButton = (props: ConnectButtonProps) => {
  const {label = 'Connect Button'} = props
  const [showModal, setShowModal] = useState(false)
  const {connected} = useWallet()

  useEffect(() => {
    if (connected) {
      setShowModal(false);
    }
  }, [connected])

  return (
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => {
        if (connected) return;
        setShowModal(open)
      }}
    >
      <div>
        {connected ? (
          <WalletInfo
            onDisconnect={() => {
              setShowModal(false)
            }}
          />
        ) : (
          <button
            className={classnames('wkit-button', props.className)}
            style={props.style}
          >
            {props.children || label}
          </button>
        )}
      </div>
    </ConnectModal>
  )
};

export default ConnectButton