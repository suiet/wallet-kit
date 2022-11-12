
// format currency
// less than 1M -> show original
// [1M, 1B)  -> x.xxxM
// [1B, Infinity)  -> x.xxxB
export function formatCurrency(amount: number | string) {
  const MILLION = 1000000;
  const BILLION = 1000000000;
  const TRILLION = 1000000000000;
  const _amount = Number(amount) / 1e9;

  if (_amount < 1) {
    return formatSmallCurrency(amount);
  }

  if (_amount >= MILLION && _amount < BILLION)
    return format(_amount, MILLION, 'M');
  if (_amount >= BILLION && _amount < TRILLION)
    return format(_amount, BILLION, 'B');
  if (_amount >= TRILLION) return format(_amount, TRILLION, 'T');

  function format(_amount: number, measureUnit: number, unitSymbol: string) {
    const showAmount = String(
      Math.floor(_amount / (measureUnit / 1000))
    ).padEnd(4, '0');
    const result = Intl.NumberFormat('en-US').format(Number(showAmount));
    return result.replace(',', '.') + unitSymbol;
  }

  return Intl.NumberFormat('en-US').format(_amount);
}

// // [1M, 1B)  -> x.xxxM
export function fullyFormatCurrency(amount: number | string) {
  if (amount < 1e9) {
    return formatSmallCurrency(amount);
  }
  return parseFloat(String(Number(amount) / 1e9)).toLocaleString();
}

// when currency is lower than 1SUI
function formatSmallCurrency(amount: number | string) {
  const _amount = Number(amount) / 1e9;

  if (_amount === 0) {
    return '0';
  }

  // 0.000000001123123 -> 0.00000000112
  // 0.01123123 -> 0.0112

  // 0.0110000 -> 0.011
  // 0.0100000 -> 0.01

  const fixNum = Math.ceil(-Math.log10(_amount));

  let minimalDigits = 0;
  for (; Number(amount) % Math.pow(10, minimalDigits) === 0; ) {
    minimalDigits = minimalDigits + 1;
  }

  // if both last 2 digits are 0
  if (
    Number(amount) % Math.pow(10, 10 - (fixNum + 2)) === 0 &&
    Number(amount) % Math.pow(10, 10 - (fixNum + 1)) === 0
  ) {
    return toFixed(_amount, fixNum);
  }

  // if only last 1 digit is 0
  if (
    Number(amount) % Math.pow(10, 10 - (fixNum + 2)) === 0 &&
    Number(amount) % Math.pow(10, 10 - (fixNum + 1)) !== 0
  ) {
    return toFixed(_amount, fixNum + 1);
  }

  return toFixed(_amount, fixNum + 2);
}

function toFixed(num: number, fixed: number) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return getFullNum(Math.floor(num * fixed) / fixed);
}

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