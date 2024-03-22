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

export async function DAIMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(dai_address)
    .call();

  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function USDTMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(usdt_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function USDCMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(usdc_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function WBTCMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(wbtc_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function LINKMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(link_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function AAVEMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(aave_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function EURSMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(eurs_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}

export async function WETHMaxLTV(): Promise<string> {
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(weth_address)
    .call();
  const result =
    parseFloat((parseInt(data["ltv"]) / 100).toString()).toFixed(2) + "%";

  return result;
}
