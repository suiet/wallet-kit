import { stringBytesToString } from "../stringBytesToString";
import { verifySignedMessage } from "../verifySignedMessage";

describe("verifySignedMessage", function () {
  const message = "Hello world!";
  const publicKey = Uint8Array.from([
    34, 75, 176, 247, 2, 153, 208, 222, 185, 81, 23, 152, 29, 41, 93, 221, 238,
    219, 246, 153, 103, 41, 27, 116, 229, 75, 24, 77, 21, 77, 116, 31,
  ]);
  const signedOutput = {
    messageBytes: "SGVsbG8gd29ybGQh",
    signature:
      "ADmKQDG8f1BQfTDqxryx64ok0Bvkd4z3Q8VZ+sfn8aeK7F/toAJKW4FsNMytXyjDAIxcXLDV7o+xHtEcKplcLQwiS7D3ApnQ3rlRF5gdKV3d7tv2mWcpG3TlSxhNFU10Hw==",
  };

  test("convert messageBytes to message", async () => {
    expect(stringBytesToString(signedOutput.messageBytes)).toBe(message);
  });

  test("verify signature", async () => {
    const isValid = await verifySignedMessage(signedOutput, publicKey);
    expect(isValid).toBe(true);
  });

  test("verify signature with wrong message", async () => {
    const isValid = await verifySignedMessage(
      {
        ...signedOutput,
        messageBytes: "SGVsbG8gd29ybGQhAA==",
      },
      publicKey
    );
    expect(isValid).toBe(false);
  });

  test("verify signature with wrong signature", async () => {
    const isValid = await verifySignedMessage(
      {
        ...signedOutput,
        signature:
          "ADmKQDG8f1BQfTDqxryx64ok0Bvkd4z3Q8VZ+sfn8aeK7F/toAJKW4FsNMytXyjDAIxcXLDV7o+xHtEcKplcLQwiS7D3ApnQ3rlRF5gdKV3d7tv2mWcpG3TlSxhNFU10Hw==AA==",
      },
      publicKey
    );
    expect(isValid).toBe(false);
  });

  test("verify signature with wrong publicKey", async () => {
    const isValid = await verifySignedMessage(
      signedOutput,
      Uint8Array.from([1, 2, 3])
    );
    expect(isValid).toBe(false);
  });
});
