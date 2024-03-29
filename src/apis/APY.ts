import { BigNumberValue, valueToZDBigNumber } from "./bignumber";

export function secondsToYear() {
  const dateObj = new Date();
  const init = new Date(dateObj.getFullYear(), 1, 1);
  const dateInit = Math.round(init.getTime() / 1000);

  const dateCurrent = Math.round(dateObj.getTime() / 1000);
  return dateCurrent - dateInit;
}

export function rayMul(a: BigNumberValue, b: BigNumberValue) {
  const RAY = valueToZDBigNumber(10).pow(27);
  const HALF_RAY = RAY.dividedBy(2);
  return HALF_RAY.plus(valueToZDBigNumber(a).multipliedBy(b)).div(RAY);
}

export function rayPow(a: BigNumberValue, p: BigNumberValue) {
  const RAY = valueToZDBigNumber(10).pow(27);
  let x = valueToZDBigNumber(a);
  let n = valueToZDBigNumber(p);
  let z = !n.modulo(2).eq(0) ? x : valueToZDBigNumber(RAY);

  for (n = n.div(2); !n.eq(0); n = n.div(2)) {
    x = rayMul(x, x);

    if (!n.modulo(2).eq(0)) {
      z = rayMul(z, x);
    }
  }
  return z;
}
