import {fromB64, fromSerializedSignature, IntentScope, messageWithIntent} from "@mysten/sui.js";
import * as tweetnacl from "tweetnacl";
import {blake2b} from "@noble/hashes/blake2b";
import {SuiSignMessageOutput} from "@mysten/wallet-standard";

/**
 * Verify a signed message based on Sui standard
 * @param input
 */
export default function verifySignedMessage(input: SuiSignMessageOutput) {
  const signature = fromSerializedSignature(input.signature);
  const message = messageWithIntent(
    IntentScope.PersonalMessage,
    fromB64(input.messageBytes)
  );
  return tweetnacl.sign.detached.verify(
    blake2b(message, { dkLen: 32 }),
    signature.signature,
    signature.pubKey.toBytes()
  )
}