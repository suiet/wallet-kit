import { Buffer } from 'buffer';

export class Uint8arrayTool {
  static toString(
    bytes: Uint8Array,
    encoding: BufferEncoding = 'utf8'
  ): string {
    return Buffer.from(bytes).toString(encoding);
  }

  static toHex(bytes: Uint8Array): string {
    return Uint8arrayTool.toString(bytes, 'hex');
  }

  static toBase64(bytes: Uint8Array): string {
    return Uint8arrayTool.toString(bytes, 'base64');
  }

  static fromHex(hex: string): Uint8Array {
    return Uint8arrayTool.from(hex, 'hex');
  }

  static fromBase64(b64: string): Uint8Array {
    return Uint8arrayTool.from(b64, 'base64');
  }

  static from(value: string, encoding: BufferEncoding = 'utf8'): Uint8Array {
    return Uint8Array.from(Buffer.from(value, encoding));
  }

  static fromArrayLike(arrayLike: { [key: number]: number }): Uint8Array {
    const length = Object.keys(arrayLike).length;
    const uint8Array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      uint8Array[i] = arrayLike[i] || 0;
    }

    return uint8Array;
  }

  static ensureUint8Array(value: unknown): Uint8Array {
    if (typeof value === 'string') {
      return Uint8Array.from(Buffer.from(value, 'base64'));
    } else if (value instanceof Uint8Array) {
      return value;
    } else if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // Handle array-like objects
      return this.fromArrayLike(value as { [key: number]: number });
    } else {
      return Uint8Array.from(value as any);
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
