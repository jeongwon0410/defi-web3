import BigNumber from "bignumber.js";

export const BigNumberZD = BigNumber.clone({
  DECIMAL_PLACES: 0,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

const bn10PowLookup: { [key: number]: BigNumber } = {};

/**
 * It's a performance optimized version of 10 ** x, which essentially memoizes previously used pows and resolves them as lookup.
 * @param decimals
 * @returns 10 ** decimals
 */
export function pow10(decimals: number): BigNumber {
  if (!bn10PowLookup[decimals])
    bn10PowLookup[decimals] = BigNumber(10).pow(decimals);
  return bn10PowLookup[decimals];
}

export function normalizeBN(n: BigNumber.Value, decimals: number): BigNumber {
  return BigNumber(n).dividedBy(pow10(decimals));
}
