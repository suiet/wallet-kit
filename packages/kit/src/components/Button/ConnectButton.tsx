import React, {ReactNode, useState} from 'react';
import classnames from "classnames";
import {Extendable} from "../../types";
import ConnectModal from "../Modal/ConnectModal";
import {useWallet} from "../../hooks/useWalletTemp";
import './index.scss';

export type ConnectButtonProps = Extendable & {
  label?: string;
  children?: ReactNode;
};

export const ConnectButton = (props: ConnectButtonProps) => {
  const {label = 'Connect Button'} = props
  const [showModal, setShowModal] = useState(false)
  // const {connected} = useWallet()

  return (
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => setShowModal(open)}
    >
      <button
        className={classnames('wkit-button', props.className)}
        style={props.style}
      >
        {props.children || label}
      </button>
    </ConnectModal>
  );
};

export default ConnectButton