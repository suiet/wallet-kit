import {BaseError} from "./BaseError";
import {ErrorCode} from "../constants";

export class WalletError extends BaseError {
  constructor(message = "wallet unknown error", code = ErrorCode.WALLET__UNKNOWN_ERROR, details?: Record<string, any>) {
    super(message, code, details);
  }
}
