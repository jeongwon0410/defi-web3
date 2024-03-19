import {
  aave_address,
  dai_address,
  dai_contract,
  eurs_address,
  link_address,
  pool_data_provider_contract,
  usdc_address,
  usdt_address,
  wbtc_address,
  weth_address,
} from "./common";

export async function DAIMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(dai_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;

  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}

export async function USDTMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(usdt_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(usdt_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}
export async function USDCMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(usdc_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(usdc_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}

export async function WBTCMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(wbtc_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(wbtc_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}

export async function LINKMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(link_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(link_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}

export async function AAVEMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(aave_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(aave_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}

export async function EURSMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(eurs_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(eurs_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}

export async function WETHMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(weth_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(weth_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;
  const result = parseFloat(percent.toString()).toFixed(2) + "%";
  return result;
}
