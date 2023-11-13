export enum QueryKey {
  COIN_BALANCE = `SUIET_COIN_BALANCE`,
}
export function queryKey(key: string, opts: Record<string, any>) {
  const uriQuery = new URLSearchParams(opts);
  return key + "?" + uriQuery.toString();
}
