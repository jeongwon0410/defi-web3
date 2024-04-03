// https://github.com/aave/aave-js/blob/master/src/helpers/ray-math.ts

import BigNumber from "bignumber.js";
import { BigNumberZD } from "./bignumber";

export const SECONDS_PER_YEAR = BigNumber(31536000);
export const RAY_DECIMALS = 27;
export const RAY = BigNumber(10).pow(27);

export function secondsToYear() {
  const dateObj = new Date();
  const init = new Date(dateObj.getFullYear(), 1, 1);
  const dateInit = Math.round(init.getTime() / 1000);

  const dateCurrent = Math.round(dateObj.getTime() / 1000);
  return dateCurrent - dateInit;
}

export function rayMul(a: BigNumber.Value, b: BigNumber.Value) {
  const RAY = BigNumberZD(10).pow(27);
  const HALF_RAY = RAY.dividedBy(2);
  return HALF_RAY.plus(BigNumberZD(a).multipliedBy(b)).div(RAY);
}

// https://github.com/aave/aave-js/blob/master/src/helpers/ray-math.ts
export function rayPow(a: BigNumber.Value, p: BigNumber.Value): BigNumber {
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
