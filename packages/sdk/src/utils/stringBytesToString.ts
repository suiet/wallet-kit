import {stringBytesToUint8Array} from "./stringBytesToUint8Array";

export function stringBytesToString(stringBytes: string) {
  return new TextDecoder().decode(stringBytesToUint8Array(stringBytes))
}
