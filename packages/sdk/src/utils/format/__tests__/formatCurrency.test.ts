import { formatCurrency } from '../formatCurrency';

describe('formatCurrency with default decimal 0', () => {
  test('decimal 0 means amount * 10^0 = amount * 1', () => {
    expect(formatCurrency('-1')).toEqual('-1');
    expect(formatCurrency('0')).toEqual('0');
    expect(formatCurrency('1')).toEqual('1');
    expect(formatCurrency('9999')).toEqual('9,999');
    expect(formatCurrency('9999999')).toEqual('9.999M');
  });

  test('compatible with bigint', () => {
    expect(formatCurrency(-1n)).toEqual('-1');
    expect(formatCurrency(0n)).toEqual('0');
    expect(formatCurrency(1n)).toEqual('1');
    expect(formatCurrency(999n)).toEqual('999');
    expect(formatCurrency(9999n)).toEqual('9,999');
    expect(formatCurrency(9999n)).toEqual('9,999');
    expect(formatCurrency(1000000n)).toEqual('1.000M');
    expect(formatCurrency(9999999n)).toEqual('9.999M');
    expect(formatCurrency(9999999999n)).toEqual('9.999B');
    expect(formatCurrency(9999999999999n)).toEqual('9.999T');
  });
});

describe('formatCurrency with default decimal 9', function () {
  test('less than 7 digits, show original', () => {
    expect(formatCurrency('-9000000000', { decimals: 9 })).toEqual('-9');
    expect(formatCurrency('0', { decimals: 9 })).toEqual('0');
    expect(formatCurrency('9000000000', { decimals: 9 })).toEqual('9');
    expect(formatCurrency('99000000000', { decimals: 9 })).toEqual('99');
    expect(formatCurrency('999000000000', { decimals: 9 })).toEqual('999');
    expect(formatCurrency('9999000000000', { decimals: 9 })).toEqual('9,999');
    expect(formatCurrency('99999000000000', { decimals: 9 })).toEqual('99,999');
    expect(formatCurrency('999999000000000', { decimals: 9 })).toEqual(
      '999,999'
    );
  });

  test('less than 1, show original', () => {
    expect(formatCurrency('1123123', { decimals: 9 })).toEqual('0.00112');
    expect(formatCurrency('10001', { decimals: 9 })).toEqual('0.00001');
    expect(formatCurrency('1001', { decimals: 9 })).toEqual('0.000001');
    // expect(formatCurrency('10001')).toEqual('0.01');
  });

  test('otherwise', () => {
    expect(formatCurrency('1000000000000000', { decimals: 9 })).toEqual(
      '1.000M'
    );
    expect(formatCurrency('9999999000000000', { decimals: 9 })).toEqual(
      '9.999M'
    );
    expect(formatCurrency('9999999999000000000', { decimals: 9 })).toEqual(
      '9.999B'
    );
    expect(formatCurrency('9999999999999000000000', { decimals: 9 })).toEqual(
      '9.999T'
    );
  });

  test('format bigint', () => {
    expect(formatCurrency(-9000000000n, { decimals: 9 })).toEqual('-9');
    expect(formatCurrency(0n, { decimals: 9 })).toEqual('0');
    expect(formatCurrency(9000000000n, { decimals: 9 })).toEqual('9');
    expect(formatCurrency(99000000000n, { decimals: 9 })).toEqual('99');
    expect(formatCurrency(999000000000n, { decimals: 9 })).toEqual('999');
    expect(formatCurrency(9999000000000n, { decimals: 9 })).toEqual('9,999');
    expect(formatCurrency(99999000000000n, { decimals: 9 })).toEqual('99,999');
    expect(formatCurrency(999999000000000n, { decimals: 9 })).toEqual(
      '999,999'
    );
    expect(formatCurrency(1000000000000000n, { decimals: 9 })).toEqual(
      '1.000M'
    );
    expect(formatCurrency(9999999000000000n, { decimals: 9 })).toEqual(
      '9.999M'
    );
    expect(formatCurrency(9999999999000000000n, { decimals: 9 })).toEqual(
      '9.999B'
    );
    expect(formatCurrency(9999999999999000000000n, { decimals: 9 })).toEqual(
      '9.999T'
    );
  });
});

describe('formatCurrency with no abbr', function () {
  test('string input', () => {
    expect(formatCurrency('1000000', { withAbbr: false })).toEqual('1,000,000');
    expect(formatCurrency('9999999999999', { withAbbr: false })).toEqual(
      '9,999,999,999,999'
    );
  });

  test('compatible with bigint input', () => {
    expect(formatCurrency(1000000n, { withAbbr: false })).toEqual('1,000,000');
    expect(formatCurrency(9999999999999n, { withAbbr: false })).toEqual(
      '9,999,999,999,999'
    );
    expect(formatCurrency(999999999999999999999n, { withAbbr: false })).toEqual(
      '999,999,999,999,999,999,999'
    );
  });
});

describe('formatCurrency with negative inputs', function () {
  test('number that does not exceed MIN_VALUE', () => {
    expect(formatCurrency(-10001013, { decimals: 9 })).toEqual('-0.01');
    expect(formatCurrency(-10001013n, { decimals: 9 })).toEqual('-0.01');
    expect(formatCurrency('-10001013', { decimals: 9 })).toEqual('-0.01');
  });
  test('number that exceeds MIN_VALUE', () => {
    expect(formatCurrency(-1000000000000000n, { decimals: 9 })).toEqual(
      '-1.000M'
    );
    expect(formatCurrency('-1000000000000000', { decimals: 9 })).toEqual(
      '-1.000M'
    );
    expect(formatCurrency(-1000000000000000, { decimals: 9 })).toEqual(
      '-1.000M'
    );
  });
});
