import { SuiSignMessageOutput } from "@mysten/wallet-standard";
import { verifyPersonalMessage } from "@mysten/sui.js/verify";
import { stringBytesToUint8Array } from "./stringBytesToUint8Array";
import { Uint8arrayTool } from "./binary";

/**
 * Verify a signed message based on Sui standard
 * @param input
 * @param publicKey
 */
export async function verifySignedMessage(
  input: SuiSignMessageOutput,
  publicKey: Uint8Array
): Promise<boolean> {
  try {
    const parsedPublicKey = await verifyPersonalMessage(
      stringBytesToUint8Array(input.messageBytes),
      input.signature
    );
    return Uint8arrayTool.bytesEqual(parsedPublicKey.toRawBytes(), publicKey);
  } catch {
    return false;
  }
}
