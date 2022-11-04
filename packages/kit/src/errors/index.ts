export enum ErrorCode {
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  KIT__UNKNOWN_ERROR = "KIT.UNKNOWN_ERROR",
  WALLET__UNKNOWN_ERROR = "WALLET.UNKNOWN_ERROR",
  USER__REJECTION = "USER.REJECTION",
}

export class BaseError extends Error {
  private code: ErrorCode;
  private details: Record<string, any> | undefined;

  constructor(
    message: string,
    details?: Record<string, any>,
    code = ErrorCode.UNKNOWN_ERROR
  ) {
    super(message);
    this.details = details;
    this.code = code;
  }
}

export class KitError extends BaseError {
  constructor(message = "kit unknown error", details?: Record<string, any>) {
    super('[KitError] ' + message, details, ErrorCode.KIT__UNKNOWN_ERROR);
  }
}

export class WalletError extends BaseError {
  constructor(message = "wallet unknown error", details?: Record<string, any>) {
    super('[WalletError] ' + message, details, ErrorCode.WALLET__UNKNOWN_ERROR);
  }
}

export class WalletNotImplementError extends WalletError {
  constructor(method: string) {
    super(`wallet does not implement function: ${method}`);
  }
}

export class UserRejectionError extends BaseError {
  constructor(message = "user rejection", details?: Record<string, any>) {
    super(message, details, ErrorCode.USER__REJECTION);
  }
}
