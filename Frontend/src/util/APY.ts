// https://github.com/aave/aave-js/blob/master/src/helpers/ray-math.ts

import BigNumber from "bignumber.js";

export const SECONDS_PER_YEAR = BigNumber(31536000);
export const RAY_DECIMALS = 27;
export const RAY = BigNumber(10).pow(27);

export const calcAPY = (liquidityRate: bigint | number | BigNumber) => {
  const apy = rayPow(
    BigNumberZD(liquidityRate.toString()).dividedBy(SECONDS_PER_YEAR).plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);

  return normalizeBN(apy, RAY_DECIMALS).multipliedBy(100);
};

function rayMul(a: BigNumber.Value, b: BigNumber.Value) {
  const RAY = BigNumberZD(10).pow(27);
  const HALF_RAY = RAY.dividedBy(2);
  return HALF_RAY.plus(BigNumberZD(a).multipliedBy(b)).div(RAY);
}

// https://github.com/aave/aave-js/blob/master/src/helpers/ray-math.ts
function rayPow(a: BigNumber.Value, p: BigNumber.Value): BigNumber {
  let x = BigNumberZD(a);
  let n = BigNumberZD(p);
  let z = !n.modulo(2).eq(0) ? x : BigNumberZD(RAY);

  for (n = n.div(2); !n.eq(0); n = n.div(2)) {
    x = rayMul(x, x);

    if (!n.modulo(2).eq(0)) {
      z = rayMul(z, x);
    }
  }
  return z;
}

const BigNumberZD = BigNumber.clone({
  DECIMAL_PLACES: 0,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

const bn10PowLookup: { [key: number]: BigNumber } = {};

/**
 * It's a performance optimized version of 10 ** x, which essentially memoizes previously used pows and resolves them as lookup.
 * @param decimals
 * @returns 10 ** decimals
 */
function pow10(decimals: number): BigNumber {
  if (!bn10PowLookup[decimals])
    bn10PowLookup[decimals] = BigNumber(10).pow(decimals);
  return bn10PowLookup[decimals];
}

function normalizeBN(n: BigNumber.Value, decimals: number): BigNumber {
  return BigNumber(n).dividedBy(pow10(decimals));
}
