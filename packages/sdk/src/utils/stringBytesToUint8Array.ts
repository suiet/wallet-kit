export function stringBytesToUint8Array(bytes: string) {
  return Uint8Array.from(atob(bytes), c => c.charCodeAt(0))
}
