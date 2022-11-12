import React, {ReactNode, useEffect, useState} from 'react';
import {BaseModal} from "./BaseModal";
import {Extendable} from "../../types";
import * as Dialog from "@radix-ui/react-dialog";
import {SvgClose} from "../Icon/SvgIcons";
import {useWallet} from "../../hooks";
import {isNonEmptyArray} from "../../utils";
import Icon from "../Icon";
import {IWallet} from "../../types/wallet";
import './index.scss';

export type ConnectModalProps = Extendable & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type WalletItemProps = Extendable & {
  wallet: IWallet;
}

const Header = () => {
  return (
    <div className={'wkit-dialog__header'}>
      <Dialog.Title className={'wkit-dialog__title'}>
        {'Connect Wallet'}
      </Dialog.Title>
      <Dialog.Close
        style={{position: 'absolute', right: '16px', top: '16px'}}
        className={'wkit-dialog__close'}
      >
        <SvgClose/>
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

const WalletItem = (props: WalletItemProps) => {
  const {wallet} = props;
  const [icon, setIcon] = useState<string>('')

  useEffect(() => {
    if (!wallet.iconUrl) return;
    setIcon(wallet.iconUrl);
  },  [wallet.iconUrl])

  return (
    <div
      className={'wkit-select-item'}
      key={wallet.name}
      onClick={() => {

      }}
    >
      <Icon
        icon={icon}
        className={'wkit-select-item__icon'}
        elClassName={'wkit-select-item__icon'}
      />
      {wallet.name}
    </div>
  )
}

const WalletList = (props: {
  title: string;
  wallets: IWallet[];
}) => {
  if (!isNonEmptyArray(props.wallets)) return null;
  return (
    <div className={'wkit-select__container'}>
      <div className={'wkit-select__title'}>{props.title}</div>
      {isNonEmptyArray(props.wallets) && props.wallets.map(wallet => {
        return (
          <WalletItem key={wallet.name} wallet={wallet} />
        )
      })}
    </div>
  )
}

export const ConnectModal = (props: ConnectModalProps) => {
  const {configuredWallets, detectedWallets} = useWallet()
  return (
    <BaseModal
      open={props.open}
      onOpenChange={props.onOpenChange}
      trigger={props.children}
      contentProps={{
        onOpenAutoFocus: (e) => {
          e.preventDefault()
        }
      }}
    >
      <Header/>
      <div className="wkit-select__scroll">
        <WalletList title={'Popular'} wallets={configuredWallets} />
        <WalletList title={'Others'} wallets={detectedWallets} />
      </div>
      <div style={{height: '41px', flexShrink: '0'}}></div>
      <Footer/>
    </BaseModal>
  );
};

export default ConnectModal