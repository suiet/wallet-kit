import logo from "./logo.svg";
import { IDefaultWallet, SupportedWallet } from "../../../types/wallet";

export const SuietWallet: IDefaultWallet = Object.freeze({
  name: SupportedWallet.SUIET_WALLET,
  iconUrl: logo,
  downloadUrl: {
    browserExtension:
      "https://chrome.google.com/webstore/detail/suiet/khpkpbbcccdmmclmpigdgddabeilkdpd",
  },
});
