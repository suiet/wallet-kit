import { Uint8arrayTool } from "../binary";

describe("Uint8arrayTool ", () => {
  const testBytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
  const testHex = "000102030405";
  const testBase64 = "AAECAwQF";

  it("should be able to convert to hex", () => {
    const hex = Uint8arrayTool.toHex(testBytes);
    expect(hex).toBe(testHex);
  });

  it("should be able to convert to base64", () => {
    const base64 = Uint8arrayTool.toBase64(testBytes);
    expect(base64).toBe(testBase64);
  });

  it("should be able to convert from hex", () => {
    const bytes = Uint8arrayTool.fromHex(testHex);
    expect(bytes).toEqual(testBytes);
  });

  it("should be able to convert from base64", () => {
    const bytes = Uint8arrayTool.fromBase64(testBase64);
    expect(bytes).toEqual(testBytes);
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
