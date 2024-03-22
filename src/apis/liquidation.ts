import { rayPow, secondsToYear } from "./APY";
import { normalize, valueToZDBigNumber } from "./bignumber";
import {
  aave_address,
  aave_contract,
  dai_address,
  dai_contract,
  eurs_address,
  eurs_contract,
  link_address,
  link_contract,
  pool_contract,
  pool_data_provider_contract,
  usdc_address,
  usdc_contract,
  usdt_address,
  usdt_contract,
  wbtc_address,
  wbtc_contract,
  weth_address,
  weth_contract,
} from "./common";

export async function DAILiquidation(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(dai_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function USDTLiquidation(account: string): Promise<string> {
  const decimals = await usdt_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(usdt_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(usdt_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function USDCLiquidation(account: string): Promise<string> {
  const decimals = await usdc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(usdc_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(usdc_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function WBTCLiquidation(account: string): Promise<string> {
  const decimals = await wbtc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(wbtc_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(wbtc_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function LINKLiquidation(account: string): Promise<string> {
  const decimals = await link_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(link_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(link_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function AAVELiquidation(account: string): Promise<string> {
  const decimals = await aave_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(aave_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(aave_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function EURSLiquidation(account: string): Promise<string> {
  const decimals = await eurs_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(eurs_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(eurs_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}

export async function WETHLiquidation(account: string): Promise<string> {
  const decimals = await weth_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(weth_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(weth_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}
