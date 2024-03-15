import {
  aave_address,
  aave_contract,
  aave_oracle_contract,
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

export async function DAIBorrowableAmount(): Promise<string | undefined> {
  const decimals = await dai_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(dai_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}

export async function USDTBorrowableAmount(): Promise<string | undefined> {
  const decimals = await usdt_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(usdt_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}
export async function USDCBorrowableAmount(): Promise<string | undefined> {
  const decimals = await usdc_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(usdc_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;
  return maxUserAmountToBorrow.toFixed(10).toString();
}

export async function WBTCBorrowableAmount(): Promise<string | undefined> {
  const decimals = await wbtc_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(wbtc_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}

export async function LINKBorrowableAmount(): Promise<string | undefined> {
  const decimals = await link_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(link_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}

export async function AAVEBorrowableAmount(): Promise<string | undefined> {
  const decimals = await aave_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(aave_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}

export async function EURSBorrowableAmount(): Promise<string | undefined> {
  const decimals = await eurs_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(eurs_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;
  return maxUserAmountToBorrow.toFixed(10).toString();
}

export async function WETHBorrowableAmount(): Promise<string | undefined> {
  const decimals = await weth_contract.methods.decimals().call();

  const currency = await pool_contract.methods
    .getUserAccountData(localStorage.getItem("account"))
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(weth_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}
