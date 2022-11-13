import { IDefaultWallet, PresetWallet } from "../../../types/wallet";

export const SuiWallet: IDefaultWallet = Object.freeze({
  name: PresetWallet.SUI_WALLET,
  iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEUAAAD////////9/f39/f3+/v7x+Pz///95wfGj1PXI5fgEMJeQAAAAB3RSTlMAECNgmNr40ET05wAAAOBJREFUeNplUksOgjAQbYw38LdloQdw5VZJDGuNiWtXdGvUFjlAtT2AVC4AekrLvKKYvoTMm5fpfGGswWCdit2cfTFNZYO49YfSYwW/t2+FS0TCTH6x/Q/wISPZwcYJSVc4uxdg1wI2Yn0QbmCXbAKin7AHtiCbq6wicvI5syK/+azowlZSoxNGc4l7IWswhqKlagtD4Kl9CAWBAmspbGHwhJK+HDMlkiaIcJ9BWWqMu64yhcbGVMU5nKoc/XC2fGs/HMbPra78+MGCwhUGSw7OEB4qOKU7Nrki/p2/8zt8ABpiv63tyiOHAAAAAElFTkSuQmCC',
  downloadUrl: {
    browserExtension:
      "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil",
  },
});
