import {WalletError} from "./index";
import {ErrorCode} from "../constants";

export class WalletNotImplementError extends WalletError {
  constructor(method: string) {
    super(`wallet does not implement function: ${method}`, ErrorCode.WALLET__METHOD_NOT_IMPLEMENTED_ERROR);
  }
}
