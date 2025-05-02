import { SignedTransaction, SuiSignPersonalMessageOutput } from "@mysten/wallet-standard";

export interface ISignatureVerifier {
  verifySignedPersonalMessage(input: SuiSignPersonalMessageOutput): Promise<boolean>;
  verifySignedTransaction(input: SignedTransaction): Promise<boolean>;
}
