export enum FeatureName {
  STANDARD__CONNECT = "standard:connect",
  STANDARD__DISCONNECT = "standard:disconnect",
  STANDARD__EVENTS = "standard:events",
  SUI__SIGN_AND_EXECUTE_TRANSACTION = "sui:signAndExecuteTransaction",
  SUI__SIGN_TRANSACTION = "sui:signTransaction",
  SUI__SIGN_PERSONAL_MESSAGE = "sui:signPersonalMessage",
  SUI__REPORT_TRANSACTION_EFFECTS = "sui:reportTransactionEffects",
  // @deprecated use SUI__SIGN_PERSONAL_MESSAGE instead
  SUI__SIGN_MESSAGE = "sui:signMessage",
  // @deprecated use SUI__SIGN_AND_EXECUTE_TRANSACTION instead
  SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK = "sui:signAndExecuteTransactionBlock",
  // @deprecated use SUI__SIGN_TRANSACTION instead
  SUI__SIGN_TRANSACTION_BLOCK = "sui:signTransactionBlock",
}
