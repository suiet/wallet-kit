import {
  SuiSignMessageOutput,
  SuiSignPersonalMessageOutput,
} from "@mysten/wallet-standard";
import { has } from "./check";
import { SignatureVerifier } from "./signature/SignatureVerifier";

/**
 * @deprecated use SignatureVerifier instead
 * Verify a signed message based on Sui standard
 * @param input
 * @param publicKey
 */
export async function verifySignedMessage(
  input: SuiSignPersonalMessageOutput | SuiSignMessageOutput,
  publicKey: Uint8Array
): Promise<boolean> {
  let message: string;
  if (has(input, "bytes")) {
    message = (input as SuiSignPersonalMessageOutput).bytes;
  } else if (has(input, "messageBytes")) {
    message = (input as SuiSignMessageOutput).messageBytes;
  } else {
    throw new Error(
      "input should be either SuiSignPersonalMessageOutput or SuiSignMessageOutput"
    );
  }
  try {
    const signatureVerifier = new SignatureVerifier();
    const isValid = await signatureVerifier.verifySignedPersonalMessage({
      bytes: message,
      signature: input.signature,
    });
    return isValid;
  } catch (e) {
    console.error('e: ', e)
    return false;
  }
}
