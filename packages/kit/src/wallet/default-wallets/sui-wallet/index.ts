import logo from "./logo.svg";
import { IDefaultWallet, SupportedWallet } from "../../../types/wallet";

export const SuiWallet: IDefaultWallet = Object.freeze({
  name: SupportedWallet.SUI_WALLET,
  iconUrl: logo,
  downloadUrl: {
    browserExtension:
      "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil",
  },
});
