import { rayPow, secondsToYear } from "./APY";
import { normalize, valueToZDBigNumber } from "./bignumber";
import {
  aave_address,
  dai_address,
  eurs_address,
  link_address,
  pool_contract,
  usdc_address,
  usdt_address,
  wbtc_address,
  weth_address,
} from "./common";

export async function DAIBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(dai_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function USDTBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(usdt_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function USDCBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(usdc_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function WBTCBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(wbtc_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function LINKBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(link_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function AAVEBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(aave_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function EURSBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(eurs_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}

export async function WETHBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await pool_contract.methods.getReserveData(weth_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}
