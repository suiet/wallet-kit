import { Buffer } from "buffer";

export class Uint8arrayTool {
  static toHex(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString("hex");
  }

  static ensureUint8Array(value: string | Uint8Array | number[]): Uint8Array {
    if (typeof value === "string") {
      return Uint8Array.from(Buffer.from(value, "base64"));
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
