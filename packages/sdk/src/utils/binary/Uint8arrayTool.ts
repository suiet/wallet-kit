import { fromB64, toHEX } from "@mysten/sui/utils";

export class Uint8arrayTool {
  static toHex(bytes: Uint8Array): string {
    return toHEX(bytes);
  }

  static ensureUint8Array(value: string | Uint8Array | number[]): Uint8Array {
    if (typeof value === "string") {
      return fromB64(value);
    } else if (value instanceof Uint8Array) {
      return value;
    } else {
      return Uint8Array.from(value);
    }
  }

  static bytesEqual(a: Uint8Array, b: Uint8Array) {
    if (a === b) return true;

    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
}
