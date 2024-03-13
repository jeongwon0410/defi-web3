import {
  aave_address,
  aave_contract,
  dai_address,
  dai_contract,
  eurs_address,
  eurs_contract,
  link_address,
  link_contract,
  pool_data_provider_contract,
  usdc_address,
  usdc_contract,
  usdt_address,
  usdt_contract,
  wbtc_address,
  wbtc_contract,
  web3,
  weth_address,
  weth_contract,
} from "./common";

export async function DAISupplyBalance(): Promise<number | undefined> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return Number(result);
}
export async function USDTSupplyBalance(): Promise<number | undefined> {
  const decimals = await usdt_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(usdt_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}
export async function USDCSupplyBalance(): Promise<number | undefined> {
  const decimals = await usdc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(usdc_address, localStorage.getItem("account"))
    .call();
  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}
export async function WBTCSupplyBalance(): Promise<number | undefined> {
  const decimals = await wbtc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(wbtc_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}
export async function LINKSupplyBalance(): Promise<number | undefined> {
  const decimals = await link_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(link_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}
export async function AAVESupplyBalance(): Promise<number | undefined> {
  const decimals = await aave_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(aave_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}
export async function EURSSupplyBalance(): Promise<number | undefined> {
  const decimals = await eurs_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(eurs_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}

export async function WETHSupplyBalance(): Promise<number | undefined> {
  const decimals = await weth_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(weth_address, localStorage.getItem("account"))
    .call();

  const result = parseInt(data[0]) / 10 ** parseInt(decimals);
  return result;
}
