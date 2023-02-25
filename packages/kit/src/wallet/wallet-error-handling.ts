import {ErrorCode} from "../errors";
import {PresetWallet} from "./preset-wallets";

export interface WalletErrorRes {
  code: ErrorCode;
  message: string;
  details: Record<string, any>;
}

export function handleConnectionError(e: Error, wallet: string): WalletErrorRes {
  let code = ErrorCode.WALLET__CONNECT_ERROR;  // default error
  let message = e.message;
  switch (wallet) {
    case PresetWallet.SUI_WALLET:
    case PresetWallet.ETHOS_WALLET:
    case PresetWallet.GLASS_WALLET:
    case PresetWallet.MORPHIS_WALLET:
      if (message.includes('Permission rejected')) {
        code = ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED
      }
      break;
    case PresetWallet.SUIET_WALLET:
      if (message.includes('User rejects approval')) {
        code = ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED
      }
      break;
    case PresetWallet.SPACECY_WALLET:
      // NOTE: Spacecy wallet doesn't return any message
      code = ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED
      break;
    case PresetWallet.SURF_WALLET:
      if (message.includes('The user rejected the request')) {
        code = ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED
      }
      break;
  }
  return {
    code,
    message,
    details: {
      wallet: wallet,
    }
  }
}