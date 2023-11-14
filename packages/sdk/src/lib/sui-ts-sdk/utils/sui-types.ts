// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export const SUI_ADDRESS_LENGTH = 32;
export function isValidSuiAddress(value: string): value is string {
  return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}

export function isValidSuiObjectId(value: string): boolean {
  return isValidSuiAddress(value);
}

/**
 * Perform the following operations:
 * 1. Make the address lower case
 * 2. Prepend `0x` if the string does not start with `0x`.
 * 3. Add more zeros if the length of the address(excluding `0x`) is less than `SUI_ADDRESS_LENGTH`
 *
 * WARNING: if the address value itself starts with `0x`, e.g., `0x0x`, the default behavior
 * is to treat the first `0x` not as part of the address. The default behavior can be overridden by
 * setting `forceAdd0x` to true
 *
 */
export function normalizeSuiAddress(
  value: string,
  forceAdd0x: boolean = false
): string {
  let address = value.toLowerCase();
  if (!forceAdd0x && address.startsWith("0x")) {
    address = address.slice(2);
  }
  return `0x${address.padStart(SUI_ADDRESS_LENGTH * 2, "0")}`;
}

export function normalizeSuiObjectId(
  value: string,
  forceAdd0x: boolean = false
): string {
  return normalizeSuiAddress(value, forceAdd0x);
}

function isHex(value: string): boolean {
  return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}

function getHexByteLength(value: string): number {
  return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}
