import {BaseError} from "./BaseError";
import {ErrorCode} from "../constants";

export class KitError extends BaseError {
  constructor(message = "kit unknown error", code = ErrorCode.KIT__UNKNOWN_ERROR, details?: Record<string, any>) {
    super(message, code, details);
  }
}
