export default function numberFormat(value) {
  return value === undefined || isNaN(value)
    ? 0
    : new Intl.NumberFormat().format(value);
}
