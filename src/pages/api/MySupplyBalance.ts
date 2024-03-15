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
  weth_address,
  weth_contract,
} from "./common";

export async function DAIMySupplyBalance(): Promise<string | undefined> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);

  if (result === 0) {
    return result.toString();
  } else {
    return result.toFixed(18);
  }
}
export async function USDTMySupplyBalance(): Promise<string | undefined> {
  const decimals = await usdt_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(usdt_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);
  return result.toString();
}
export async function USDCMySupplyBalance(): Promise<string | undefined> {
  const decimals = await usdc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(usdc_address, localStorage.getItem("account"))
    .call();
  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function WBTCMySupplyBalance(): Promise<string | undefined> {
  const decimals = await wbtc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(wbtc_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);
  return result.toString();
}
export async function LINKMySupplyBalance(): Promise<string | undefined> {
  const decimals = await link_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(link_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);
  return result.toString();
}
export async function AAVEMySupplyBalance(): Promise<string | undefined> {
  const decimals = await aave_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(aave_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);
  return result.toString();
}
export async function EURSMySupplyBalance(): Promise<string | undefined> {
  const decimals = await eurs_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(eurs_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);
  return result.toString();
}

export async function WETHMySupplyBalance(): Promise<string | undefined> {
  const decimals = await weth_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(weth_address, localStorage.getItem("account"))
    .call();

  const result =
    parseInt(data["currentATokenBalance"]) / 10 ** parseInt(decimals);
  return result.toString();
}
