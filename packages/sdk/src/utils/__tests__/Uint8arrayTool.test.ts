import { Uint8arrayTool } from '..';

describe('Uint8arrayTool ', () => {
  const testHex = '68656c6c6f20776f726c64';
  const testBase64 = 'aGVsbG8gd29ybGQ=';
  const testUtf8 = 'hello world';
  const testBytes = new TextEncoder().encode('hello world');

  it('should be able to convert to hex', () => {
    const hex = Uint8arrayTool.toHex(testBytes);
    expect(hex).toBe(testHex);
  });

  it('should be able to convert to base64', () => {
    const base64 = Uint8arrayTool.toBase64(testBytes);
    expect(base64).toBe(testBase64);
  });

  it('should be able to convert from hex', () => {
    const bytes = Uint8arrayTool.fromHex(testHex);
    expect(bytes).toEqual(testBytes);
  });

  it('should be able to convert from base64', () => {
    const bytes = Uint8arrayTool.fromBase64(testBase64);
    expect(bytes).toEqual(testBytes);
  });

  it('should be able to convert from utf8', () => {
    const bytes = Uint8arrayTool.from(testUtf8);
    expect(bytes).toEqual(new TextEncoder().encode(testUtf8));
  });

  it('should be able to convert to utf8', () => {
    const str = Uint8arrayTool.toString(testBytes, 'utf8');
    expect(str).toBe(testUtf8);
  });

  it('should be able to ensure Uint8Array', () => {
    const bytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const b64 = 'AAECAwQF';
    const arr = [0, 1, 2, 3, 4, 5];
    expect(Uint8arrayTool.ensureUint8Array(bytes)).toBe(bytes);
    expect(Uint8arrayTool.ensureUint8Array(b64)).toEqual(bytes);
    expect(Uint8arrayTool.ensureUint8Array(arr)).toEqual(bytes);
  });

  it('should be able to compare bytes', () => {
    const a = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const b = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const c = new Uint8Array([0, 1, 2, 3, 4, 6]);
    const d = new Uint8Array([0, 1, 2, 3, 4]);
    expect(Uint8arrayTool.bytesEqual(a, b)).toBe(true);
    expect(Uint8arrayTool.bytesEqual(a, c)).toBe(false);
    expect(Uint8arrayTool.bytesEqual(a, d)).toBe(false);
  });

  it('should convert array-like object to Uint8Array', () => {
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
    };
    const expected = new Uint8Array([1, 2, 3]);
    expect(Uint8arrayTool.fromArrayLike(arrayLike)).toEqual(expected);
  });

  it('should handle array-like objects through ensureUint8Array', () => {
    const arrayLike = {
      0: 1,
      1: 2,
      2: 3,
    };
    const expected = new Uint8Array([1, 2, 3]);
    expect(Uint8arrayTool.ensureUint8Array(arrayLike)).toEqual(expected);
  });
});
