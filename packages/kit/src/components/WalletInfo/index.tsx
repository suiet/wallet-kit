import classnames from "classnames";
import React, { useCallback, useState } from "react";
import "./index.scss";
import { useWallet } from "../../hooks/useWallet";
import { Extendable } from "../../types/utils";
import { SvgArrowDown } from "../Icon/SvgIcons";
import type { WalletAccount } from "@mysten/wallet-standard";
import { useAccountBalance } from "../../hooks";
import {
  formatSUI,
  addressEllipsis,
  UnknownChain,
  BaseError,
} from "@suiet/wallet-sdk";
import { AccountModal } from "../Modal/AccountModal";

export type ConnectButtonProps = Extendable & {
  label?: string;
  onDisconnectSuccess?: (walletName: string) => void;
  onDisconnectError?: (error: BaseError) => void;
};

function WalletInfo(props: ConnectButtonProps) {
  const { account, chain, connected } = useWallet();
  const { balance } = useAccountBalance();
  const [showAccountModal, setShowAccountModal] = useState(false);

  const renderBalance = useCallback(() => {
    if (!chain || chain.id === UnknownChain.id) {
      return <>Unknown Chain</>;
    }
    // TODO: formatCurrency supports bigint
    return <>{formatSUI(balance ?? 0)} SUI</>;
  }, [balance, chain]);

  if (!connected) return null;
  return (
    <div
      className={classnames("wkit-connected-container", props.className)}
      style={props.style}
    >
      <AccountModal
        open={showAccountModal}
        onOpenChange={setShowAccountModal}
        onDisconnectSuccess={props.onDisconnectSuccess}
        onDisconnectError={props.onDisconnectError}
      >
        <button
          className={classnames("wkit-connected-button")}
          onClick={() => {
            setShowAccountModal(true);
          }}
        >
          <span className={"wkit-connected-button__balance"}>
            {renderBalance()}
          </span>
          <div className={"wkit-connected-button__divider"}></div>
          <div className={"wkit-address-select"}>
            <div className={"wkit-address-select__content"}>
              <span className={"wkit-address-select__address"}>
                {(account as any)?.suinsName ?? addressEllipsis((account as WalletAccount)?.address)}
              </span>
            </div>
            <span className={"wkit-address-select__right-arrow"}>
              <SvgArrowDown />
            </span>
          </div>
        </button>
      </AccountModal>
    </div>
  );
}

export default WalletInfo;
