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

export async function DAISupplyTotal(): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(dai_address)
    .call();

  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function USDTSupplyTotal(): Promise<string> {
  const decimals = await usdt_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(usdt_address)
    .call();

  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}

export async function USDCSupplyTotal(): Promise<string> {
  const decimals = await usdc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(usdc_address)
    .call();

  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}

export async function WBTCSupplyTotal(): Promise<string> {
  const decimals = await wbtc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(wbtc_address)
    .call();

  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}

export async function LINKSupplyTotal(): Promise<string> {
  const decimals = await link_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(link_address)
    .call();
  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}

export async function AAVESupplyTotal(): Promise<string> {
  const decimals = await aave_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(aave_address)
    .call();
  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}

export async function EURSSupplyTotal(): Promise<string> {
  const decimals = await eurs_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(eurs_address)
    .call();
  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}

export async function WETHSupplyTotal(): Promise<string> {
  const decimals = await weth_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveData(weth_address)
    .call();
  const total = parseInt(data["totalAToken"]) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}
