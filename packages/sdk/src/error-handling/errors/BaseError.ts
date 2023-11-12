import {ErrorCode} from "../constants";

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
    this.message = this.formatErrorStr(code, message, details);
  }

  formatErrorStr(code: string, message: string, details?: Record<string, any>) {
    let str = `[${this.code}] ${message}`
    if (details) str += ' | details: ' + JSON.stringify(details)
    return str
  }
}
