import { Uint8arrayTool } from "../binary";

describe("Uint8arrayTool ", () => {
  it("should be able to convert to hex", () => {
    const bytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const hex = Uint8arrayTool.toHex(bytes);
    expect(hex).toBe("000102030405");
  });

  it("should be able to ensure Uint8Array", () => {
    const bytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const b64 = "AAECAwQF";
    const arr = [0, 1, 2, 3, 4, 5];
    expect(Uint8arrayTool.ensureUint8Array(bytes)).toBe(bytes);
    expect(Uint8arrayTool.ensureUint8Array(b64)).toEqual(bytes);
    expect(Uint8arrayTool.ensureUint8Array(arr)).toEqual(bytes);
  });

  it("should be able to compare bytes", () => {
    const a = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const b = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const c = new Uint8Array([0, 1, 2, 3, 4, 6]);
    const d = new Uint8Array([0, 1, 2, 3, 4]);
    expect(Uint8arrayTool.bytesEqual(a, b)).toBe(true);
    expect(Uint8arrayTool.bytesEqual(a, c)).toBe(false);
    expect(Uint8arrayTool.bytesEqual(a, d)).toBe(false);
  });
});
