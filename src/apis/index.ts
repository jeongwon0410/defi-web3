import BigNumber from "bignumber.js";
import { secondsToYear, rayPow } from "../util/APY";
import {
  titleToContract,
  pool_data_provider_contract,
  pool_contract,
} from "../constants/contract";
import { AssetTitle, titleToAddr } from "@/constants/assets";
import { valueToZDBigNumber } from "@/util/bignumber";

export const getSupplyTotal = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getReserveData(addr)
    .call();

  const totalAToken = data.totalAToken as bigint;
  const supplyTotal = totalAToken / 10n ** decimals;

  return BigNumber(supplyTotal.toString());
};

export const getSupplyAPY = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const RAY = 10 ** 27; // 10 to the power 27
  const SECONDS_PER_YEAR = secondsToYear();

  const data = await pool_contract.methods.getReserveData(addr).call();
  const currentLiquidityRate = BigNumber(data.currentLiquidityRate.toString());

  const apy = rayPow(
    valueToZDBigNumber(currentLiquidityRate.toString())
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);

  return apy;
};

export const getMaxLTV = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(addr)
    .call();

  return BigNumber(data.ltv.toString());
};

export const getBalance = async (title: AssetTitle, account: string) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const balance = (await contract.methods.balanceOf(account).call()) as bigint;

  return BigNumber(balance.toString()).dividedBy(
    BigNumber(10).pow(BigNumber(decimals.toString())),
  );
};

export const getMySupplyBalance = async (
  title: AssetTitle,
  account: string,
) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(titleToAddr.DAI, account)
    .call();

  const currentATokenBalance = BigNumber(data.currentATokenBalance.toString());

  return currentATokenBalance.dividedBy(
    BigNumber(10).pow(BigNumber(decimals.toString())),
  );
};
