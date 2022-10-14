import type {
  SignableTransaction,
  SuiTransactionResponse,
} from '@mysten/sui.js';
import type { SignAndSendTransactionInput } from '@wallet-standard/features';

export type SuiSignAndExecuteTransactionVersion = '1.0.0';

interface SuiSignAndExecuteTransactionOptions {}

interface SuiSignAndExecuteTransactionInput
  extends Omit<
    SignAndSendTransactionInput,
    // TODO: Right now, we don't have intent signing, but eventually we'll need to re-introduce
    // the concept of chains + account during the signing here.
    'transaction' | 'chain' | 'account'
  > {
  options?: SuiSignAndExecuteTransactionOptions;
  transaction: SignableTransaction;
}

export type SuiSignAndExecuteTransactionFeature = {
  'sui:signAndExecuteTransaction': {
    version: SuiSignAndExecuteTransactionVersion;
    signAndExecuteTransaction: (
      input: SuiSignAndExecuteTransactionInput
    ) => Promise<SuiTransactionResponse>;
  };
};
