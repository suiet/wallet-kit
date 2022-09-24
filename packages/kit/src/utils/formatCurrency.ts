export function formatCurrency(amount: number | string) {
  const THOUSAND = 1000;
  const MILLION = 1000000;
  const BILLION = 1000000000;
  const TRILLION = 1000000000000;
  const _amount = Number(amount);
  if (_amount >= THOUSAND && _amount < MILLION)
    return format(_amount, THOUSAND, 'K');
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
