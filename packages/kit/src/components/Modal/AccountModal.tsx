import React, { useCallback, useState } from "react";
import { BaseModal } from "./BaseModal";
import { Extendable } from "../../types/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { SvgClose, SvgCopy, SvgDisconnect } from "../Icon/SvgIcons";
import { useWallet } from "../../hooks";
import { addressEllipsis, BaseError } from "@suiet/wallet-sdk";
import { copyToClipboard } from "../../utils/copy";
import "./index.scss";

export type AccountModalProps = Extendable & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDisconnectSuccess?: (walletName: string) => void;
  onDisconnectError?: (error: BaseError) => void;
};

const Header = () => {
  return (
    <div className={"wkit-dialog__header"}>
    <Dialog.Title className={"wkit-dialog__title"}>
      {"Account"}
    </Dialog.Title>
      <Dialog.Close
        style={{ position: "absolute", right: "16px", top: "16px" }}
        className={"wkit-dialog__close"}
      >
        <SvgClose />
      </Dialog.Close>
    </div>
  );
};

export const AccountModal = (props: AccountModalProps) => {
  const { disconnect, account, name } = useWallet();
  const [copySuccess, setCopySuccess] = useState(false);

  const {
    onDisconnectSuccess = () => {},
    onDisconnectError = (err) => {
      throw err;
    },
  } = props;

  const handleCopyAddress = useCallback(async () => {
    if (!account?.address) return;
    
    try {
      const success = await copyToClipboard(account.address);
      if (success) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      console.warn('Failed to copy address:', error);
    }
  }, [account?.address]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      props.onOpenChange?.(false);
      onDisconnectSuccess(name as string);
    } catch (error) {
      onDisconnectError(error as BaseError);
    }
  }, [disconnect, name, onDisconnectSuccess, onDisconnectError, props]);

  const renderAccountInfo = () => {
    const suinsName = (account as any)?.suinsName;
    
    return (
      <div className="wkit-account-modal__content">
        <div className="wkit-account-modal__info">
          {suinsName ? (
            <>
              <div className="wkit-account-modal__name">
                {suinsName}
              </div>
              <div className="wkit-account-modal__address">
                {addressEllipsis(account?.address ?? '')}
              </div>
            </>
          ) : (
            <div className="wkit-account-modal__name">
              {addressEllipsis(account?.address ?? '')}
            </div>
          )}
        </div>
        
        <div className="wkit-account-modal__actions">
          <button
            className="wkit-account-modal__action-button"
            onClick={handleCopyAddress}
          >
            <SvgCopy />
            <span className="wkit-account-modal__action-button-text">
              {copySuccess ? 'Copied!' : 'Copy Address'}
            </span>
          </button>
          
          <button
            className="wkit-account-modal__action-button wkit-account-modal__action-button--disconnect"
            onClick={handleDisconnect}
          >
            <SvgDisconnect />
            <span className="wkit-account-modal__action-button-text wkit-account-modal__action-button-text--danger">
              Disconnect
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <BaseModal
      open={props.open}
      onOpenChange={props.onOpenChange}
      trigger={props.children}
      contentProps={{
        onOpenAutoFocus: (e: Event) => {
          e.preventDefault();
        },
      }}
    >
      <Header />
      {renderAccountInfo()}
    </BaseModal>
  );
};

export default AccountModal;
