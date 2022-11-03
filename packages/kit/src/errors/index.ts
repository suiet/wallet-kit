export enum ErrorCode {
  KIT__UNKNOWN_ERROR = "KIT.UNKNOWN_ERROR",
  WALLET__UNKNOWN_ERROR = "WALLET.UNKNOWN_ERROR",
  USER__REJECTION = "USER.REJECTION",
}

export class KitError extends Error {
  private code: ErrorCode;
  private details: Record<string, any> | undefined;

  constructor(
    message: string,
    details?: Record<string, any>,
    code = ErrorCode.KIT__UNKNOWN_ERROR
  ) {
    super(message);
    this.name = "KitError";
    this.details = details;
    this.code = code;
  }
}

export class WalletError extends KitError {
  constructor(message = "wallet unknown error", details?: Record<string, any>) {
    super(message, details, ErrorCode.WALLET__UNKNOWN_ERROR);
  }
}

export class UserRejectionError extends KitError {
  constructor(message = "user rejection", details?: Record<string, any>) {
    super(message, details, ErrorCode.USER__REJECTION);
  }
}
