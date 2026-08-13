/** Ontario HST applied on all shop checkouts */
export const HST_PERCENT = 13;

export function calcHst(subtotal: number) {
  return Math.round(subtotal * (HST_PERCENT / 100) * 100) / 100;
}
