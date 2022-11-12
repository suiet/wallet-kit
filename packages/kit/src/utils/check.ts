export function isNonEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}