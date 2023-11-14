import {
  SuiSignMessageOutput,
  SuiSignPersonalMessageOutput,
} from "@mysten/wallet-standard";
import { verifyPersonalMessage } from "@mysten/sui.js/verify";
import { stringBytesToUint8Array } from "./stringBytesToUint8Array";
import { Uint8arrayTool } from "./binary";
import { has } from "./check";

/**
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
    const parsedPublicKey = await verifyPersonalMessage(
      stringBytesToUint8Array(message),
      input.signature
    );
    return Uint8arrayTool.bytesEqual(parsedPublicKey.toRawBytes(), publicKey);
  } catch {
    return false;
  }
}
