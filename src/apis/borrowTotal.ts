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

export async function DAIBorrowTotal(): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(dai_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function USDTBorrowTotal(): Promise<string> {
  const decimals = await usdt_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(usdt_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function USDCBorrowTotal(): Promise<string> {
  const decimals = await usdc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(usdc_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function WBTCBorrowTotal(): Promise<string> {
  const decimals = await wbtc_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(wbtc_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function LINKBorrowTotal(): Promise<string> {
  const decimals = await link_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(link_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function AAVEBorrowTotal(): Promise<string> {
  const decimals = await aave_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(aave_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function EURSBorrowTotal(): Promise<string> {
  const decimals = await eurs_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(eurs_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}

export async function WETHBorrowTotal(): Promise<string> {
  const decimals = await weth_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(weth_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
