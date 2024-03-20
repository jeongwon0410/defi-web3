import { rayPow, secondsToYear } from "./APY";
import { normalize, valueToZDBigNumber } from "./bignumber";
import {
  aave_address,
  dai_address,
  eurs_address,
  link_address,
  pool_contract,
  pool_data_provider_contract,
  usdc_address,
  usdt_address,
  wbtc_address,
  weth_address,
} from "./common";

export async function DAILiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(dai_address).call();

  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";

  return Liquidation;
}

export async function USDTLiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(usdt_address).call();

  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";
  return Liquidation;
}

export async function USDCLiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(usdc_address).call();

  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";
  return Liquidation;
}

export async function WBTCLiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(wbtc_address).call();

  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";
  return Liquidation;
}

export async function LINKLiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(link_address).call();
  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";
  return Liquidation;
}

export async function AAVELiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(aave_address).call();

  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";

  return Liquidation;
}

export async function EURSLiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(eurs_address).call();

  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";
  return Liquidation;
}

export async function WETHLiquidation(): Promise<string> {
  const data = await pool_contract.methods.getReserveData(weth_address).call();
  const Liquidation =
    data["currentLiquidityRate"].toString().substr(0, 2) + "%";

  return Liquidation;
}
