export enum ErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  KIT__UNKNOWN_ERROR = "KIT.UNKNOWN_ERROR",
  WALLET__UNKNOWN_ERROR = "WALLET.UNKNOWN_ERROR",
  WALLET__CONNECT_ERROR = "WALLET.CONNECT_ERROR",
  WALLET__DISCONNECT_ERROR = "WALLET.DISCONNECT_ERROR",
  WALLET__SIGN_TX_ERROR = "WALLET.SIGN_TX_ERROR",
  WALLET__SIGN_MSG_ERROR = "WALLET.SIGN_MSG_ERROR",
  WALLET__LISTEN_TO_EVENT_ERROR = "WALLET.LISTEN_TO_EVENT_ERROR",
  WALLET__METHOD_NOT_IMPLEMENTED_ERROR = "WALLET.METHOD_NOT_IMPLEMENTED_ERROR",
}

export class BaseError extends Error {
  code: ErrorCode;
  details: Record<string, any> | undefined;

  constructor(
    message: string,
    code = ErrorCode.UNKNOWN_ERROR,
    details?: Record<string, any>,
  ) {
    super(message);
    this.details = details;
    this.code = code;
  }
}

export class KitError extends BaseError {
  constructor(message = "kit unknown error", code = ErrorCode.KIT__UNKNOWN_ERROR, details?: Record<string, any>) {
    super('[KitError] ' + message, code, details);
  }
}

export class WalletError extends BaseError {
  constructor(message = "wallet unknown error", code = ErrorCode.WALLET__UNKNOWN_ERROR, details?: Record<string, any>) {
    super('[WalletError] ' + message, code, details);
  }
}

export class WalletNotImplementError extends WalletError {
  constructor(method: string) {
    super(`wallet does not implement function: ${method}`, ErrorCode.WALLET__METHOD_NOT_IMPLEMENTED_ERROR);
  }
}
