const MILLION = 1_000_000;
const BILLION = 1_000_000_000;
const TRILLION = 1_000_000_000_000;

export function formatSUI(
  amount: number | string | bigint,
  options?: {
    withAbbr?: boolean;
  }
) {
  return formatCurrency(
    amount,
    Object.assign(
      {
        decimals: 9,
      },
      options
    )
  );
}

// formatWithAbbr currency
// less than 1M -> show original
// [1M, 1B)  -> x.xxxM
// [1B, Infinity)  -> x.xxxB
export function formatCurrency(
  amount: number | string | bigint,
  options?: {
    decimals?: number;
    withAbbr?: boolean;
  }
): string {
  const { decimals = 0, withAbbr = true } = options ?? {};
  // handle bigint that exceeds safe integer range
  if (typeof amount === 'bigint' && !isSafeToConvertToNumber(amount)) {
    return formatCurrencyBigInt(BigInt(amount), {
      decimals,
      withAbbr,
    });
  }
  // else, convert to number for formatting logic
  if (Number(amount) === 0) return '0';
  if (Number(amount) < 0) {
    return '-' + formatCurrency(-Number(amount), options);
  }
  const _amount = Number(amount) / 10 ** decimals;
  if (_amount > 0 && _amount < 1) {
    return formatSmallCurrency(_amount);
  }
  return format(_amount, withAbbr);
}

function format(amount: number | bigint, showAbbr: boolean): string {
  if (showAbbr) {
    if (amount >= MILLION && amount < BILLION)
      return formatWithAbbr(amount, MILLION, 'M');
    if (amount >= BILLION && amount < TRILLION)
      return formatWithAbbr(amount, BILLION, 'B');
    if (amount >= TRILLION) return formatWithAbbr(amount, TRILLION, 'T');
  }

  return Intl.NumberFormat('en-US').format(amount);
}

function formatWithAbbr(
  amount: number | bigint,
  measureUnit: number,
  abbrSymbol: string
) {
  let _amount: string;
  if (typeof amount === 'bigint') {
    _amount = String(amount / (BigInt(measureUnit) / 1000n));
  } else {
    _amount = String(Math.floor(amount / (measureUnit / 1000)));
  }
  const showAmount = _amount.padEnd(4, '0');
  const result = Intl.NumberFormat('en-US').format(Number(showAmount));
  return result.replace(',', '.') + abbrSymbol;
}

// when currency is lower than 1SUI
function formatSmallCurrency(amount: number) {
  if (amount <= 0) return '0';

  const fixNum = Math.ceil(-Math.log10(amount));

  let minimalDigits = 0;
  for (; Number(amount) % Math.pow(10, minimalDigits) === 0; ) {
    minimalDigits = minimalDigits + 1;
  }

  // if both last 2 digits are 0
  if (
    Number(amount) % Math.pow(10, 10 - (fixNum + 2)) === 0 &&
    Number(amount) % Math.pow(10, 10 - (fixNum + 1)) === 0
  ) {
    return toFixed(amount, fixNum);
  }

  // if only last 1 digit is 0
  if (
    Number(amount) % Math.pow(10, 10 - (fixNum + 2)) === 0 &&
    Number(amount) % Math.pow(10, 10 - (fixNum + 1)) !== 0
  ) {
    return toFixed(amount, fixNum + 1);
  }

  return toFixed(amount, fixNum + 2);
}

function toFixed(num: number, fixed: number) {
  function getFullNum(num: number) {
    // if not num
    if (isNaN(num)) {
      return num.toString();
    }

    // parse string no need to transform
    const str = '' + num;
    if (!/e/i.test(str)) {
      return num.toString();
    }

    return num.toFixed(18).replace(/\.?0+$/, '');
  }

  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return getFullNum(Math.floor(num * fixed) / fixed);
}

// handle bigint that exceeds the maximum number
function formatCurrencyBigInt(
  amount: bigint,
  options?: {
    decimals?: number;
    withAbbr?: boolean;
  }
): string {
  if (amount === 0n) return '0';
  if (amount < 0n) return '-' + formatCurrencyBigInt(-amount, options);

  const { decimals = 9, withAbbr = true } = options ?? {};
  const _amount = amount / 10n ** BigInt(decimals);
  return format(_amount, withAbbr);
}

function isSafeToConvertToNumber(bigintValue: bigint) {
  const minValue = Number.MIN_SAFE_INTEGER; // -9007199254740991
  const maxValue = Number.MAX_SAFE_INTEGER; // 9007199254740991

  return bigintValue >= BigInt(minValue) && bigintValue <= BigInt(maxValue);
}
