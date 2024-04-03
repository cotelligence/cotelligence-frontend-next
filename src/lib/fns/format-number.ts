export const formatNumber = (input: number | string, fractionDigits = 2) =>
  Number(Number(input).toFixed(fractionDigits)).toLocaleString('en-us');
