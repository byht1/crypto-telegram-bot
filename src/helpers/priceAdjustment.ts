export function priceAdjustment(value: number | null) {
  if (!value) return;
  return Math.floor(value * 100) / 100;
}
