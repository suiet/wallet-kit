export function addressEllipsis(address: string) {
  if (!address || !address.startsWith('0x'))
    return address;

  return address.slice(0, 4) + '....' + address.slice(-4);
}
