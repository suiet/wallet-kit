import React from 'react';
import {BaseModal} from "./BaseModal";
import {Extendable} from "../../types";
import * as Dialog from "@radix-ui/react-dialog";
import classnames from "classnames";
import {SvgClose} from "../Icon/SvgIcons";

export type ConnectModalProps = Extendable & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Header = () => {
  return (
    <div className={'wkit-dialog__header'}>
      <Dialog.Title className={'wkit-dialog__title'}>
        {'Connect Wallet'}
      </Dialog.Title>
      <Dialog.Close
        style={{ position: 'absolute', right: '16px', top: '16px' }}
        className={'wkit-dialog__close'}
      >
        <SvgClose />
      </Dialog.Close>
    </div>
  )
}

const Footer = () => {
  return (
    <div className={'wkit-new-to-sui'}>
      <span className={'wkit-new-to-sui__text'}>New to sui? </span>
      <a
        className={'wkit-new-to-sui__link'}
        href="https://suiet.app/docs/getting-started"
        target="_blank"
      >
        Learn More Here
      </a>
    </div>
  )
}

const ConnectModal = (props: ConnectModalProps) => {
  return (
    <BaseModal
      open={props.open}
      onOpenChange={props.onOpenChange}
      trigger={props.children}
      contentProps={{
        onOpenAutoFocus: (e) => {e.preventDefault()}
      }}
    >
      <Header />
      <div className="wkit-select__scroll">
      </div>
      <div style={{ height: '41px', flexShrink: '0' }}></div>
      <Footer />
    </BaseModal>
  );
};

export default ConnectModal;