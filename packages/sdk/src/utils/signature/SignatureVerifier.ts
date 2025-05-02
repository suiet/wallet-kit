import { SignedTransaction, SuiSignPersonalMessageOutput } from "@mysten/wallet-standard";
import { ISignatureVerifier } from "./ISignatureVerifier";
import { verifyPersonalMessageSignature, verifyTransactionSignature } from "@mysten/sui/verify";
import { Uint8arrayTool } from "../binary";
import { ErrorCode, WalletError } from "../../error-handling";

export class SignatureVerifier implements ISignatureVerifier {
  constructor(private readonly address?: string) {
    this.address = address;
  }

  async verifySignedPersonalMessage(input: SuiSignPersonalMessageOutput): Promise<boolean> {
    try {
        const res = await verifyPersonalMessageSignature(
            Uint8arrayTool.from(input.bytes, 'base64'),
            input.signature,
            {
                address: this.address,
            }
        );
        return true;
    } catch (e: any) {
        throw new WalletError(e?.message, ErrorCode.WALLET__VERIFY_PERSONAL_MSG_ERROR);
    }
  }

  async verifySignedTransaction(input: SignedTransaction): Promise<boolean> {
    try {
        const res = await verifyTransactionSignature(
            Uint8arrayTool.from(input.bytes, 'base64'),
            input.signature,
            {
                address: this.address,
            }
        );
        return true;
    } catch (e: any) {
        throw new WalletError(e?.message, ErrorCode.WALLET__VERIFY_TRANSACTION_ERROR);
    }
  }
}