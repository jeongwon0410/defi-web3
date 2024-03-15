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

export async function DAIBorrowTotal(): Promise<string | undefined> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(dai_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function USDTBorrowTotal(): Promise<string | undefined> {
  const decimals = await usdt_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(usdt_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function USDCBorrowTotal(): Promise<string | undefined> {
  const decimals = await usdc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(usdc_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function WBTCBorrowTotal(): Promise<string | undefined> {
  const decimals = await wbtc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(wbtc_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function LINKBorrowTotal(): Promise<string | undefined> {
  const decimals = await link_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(link_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function AAVEBorrowTotal(): Promise<string | undefined> {
  const decimals = await aave_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(aave_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function EURSBorrowTotal(): Promise<string | undefined> {
  const decimals = await eurs_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(eurs_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}

export async function WETHBorrowTotal(): Promise<string | undefined> {
  const decimals = await weth_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(weth_address)
    .call();
  const result = parseInt(data) / 10 ** parseInt(decimals);

  return result.toString();
}
