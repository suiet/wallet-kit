import { SignedTransaction } from "@mysten/wallet-standard";

export type ExecuteTransactionResult =
  | {
      digest: string;
      rawEffects?: number[];
    }
  | {
      digest: string;
      effects?: {
        bcs?: string;
      };
    };

export type ExecuteTransactionOptions = {
  execute?: (
    signedTransaction: SignedTransaction
  ) => Promise<ExecuteTransactionResult>;
};
