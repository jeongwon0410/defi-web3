import {
  aave_address,
  dai_address,
  eurs_address,
  link_address,
  pool_data_provider_contract,
  usdc_address,
  usdt_address,
  wbtc_address,
  weth_address,
} from "./common";

export async function DAISupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(dai_address)
    .call();

  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function USDTSupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(usdt_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function USDCSupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(usdc_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function WBTCSupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(wbtc_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function LINKSupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(link_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function AAVESupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(aave_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function EURSSupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(eurs_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function WETHSupplyMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(weth_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}
