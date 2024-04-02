"use client";

import useSWR, { useSWRConfig } from "swr";

import BigNumber from "bignumber.js";
import { useAccount } from "wagmi";
import {
  getSupplyTotal,
  getSupplyAPY,
  getMaxLTV,
  getBalance,
  getMySupplyBalance,
  getBorrowTotal,
  getBorrowApy,
  getDebt,
  getBorrowableAmount,
  getLiquidation,
  getAvailableLiquidity,
  getApprovedAmount,
  getHealthFactor,
  estimateGas,
} from "./contract";
import { AssetTitle } from "@/constants/assets";
import { REFRESH_RATE_MS } from "@/constants/common";

export const useContract = (
  type: ContractType,
  title: AssetTitle | null | undefined,
) => {
  return useSWR(title ? [type, title] : null, contractFetcher, {
    refreshInterval: REFRESH_RATE_MS,
  });
};

export const usePrivateContract = (
  type: PrivateContractType,
  title: AssetTitle | null | undefined,
) => {
  const { address } = useAccount();

  return useSWR(
    title && address ? [type, title, address] : null,
    privateContractFetcher,
    { refreshInterval: REFRESH_RATE_MS },
  );
};

export type ContractType =
  | "SUPPLYTOTAL"
  | "SUPPLYAPY"
  | "MAXLTV"
  | "BORROWTOTAL"
  | "BORROWAPY"
  | "LIQUIDITY";

export const contractFetcher = (arg: [ContractType, AssetTitle]) => {
  const title = arg[1];
  switch (arg[0]) {
    case "SUPPLYTOTAL":
      return getSupplyTotal(title);
    case "SUPPLYAPY":
      return getSupplyAPY(title);
    case "MAXLTV":
      return getMaxLTV(title);
    case "BORROWTOTAL":
      return getBorrowTotal(title);
    case "BORROWAPY":
      return getBorrowApy(title);
    case "LIQUIDITY":
      return getAvailableLiquidity(title);
  }
};

export type PrivateContractType =
  | "BALANCE"
  | "SUPPLYBALANCE"
  | "BORROWAMOUNT"
  | "BORROWABLEAMOUNT"
  | "LIQUIDATION"
  | "APPROVEDAMOUNT"
  | "HEALTHFACTOR";

export const privateContractFetcher = (
  arg: [PrivateContractType, AssetTitle, string],
) => {
  const title = arg[1];
  const account = arg[2];

  switch (arg[0]) {
    case "BALANCE":
      return getBalance(title, account);
    case "SUPPLYBALANCE":
      return getMySupplyBalance(title, account);
    case "BORROWAMOUNT":
      return getDebt(title, account);
    case "BORROWABLEAMOUNT":
      return getBorrowableAmount(title, account);
    case "LIQUIDATION":
      return getLiquidation(title, account);
    case "APPROVEDAMOUNT":
      return getApprovedAmount(title, account);
    case "HEALTHFACTOR":
      return getHealthFactor(title, account);
  }
};

export const useMutateContract = () => {
  const { mutate } = useSWRConfig();
  return (type: ContractType | PrivateContractType) => mutate(type);
};

export const useEstimatedGas = (title: AssetTitle | null, amount: string) => {
  const { address } = useAccount();

  const { data: gas } = useSWR(
    title && address ? ["ESTIMATEGAS", title, address, amount] : null,
    ([, title, address, amount]) =>
      estimateGas(title as AssetTitle, address, amount),
  );

  const { data: ethToDollar } = useEthToDollar();

  if (ethToDollar === undefined || gas === undefined) return undefined;

  const dollar = gas.multipliedBy(ethToDollar).dividedBy(BigNumber(10).pow(9));

  return dollar;
};

const useEthToDollar = () => {
  return useSWR(["ETHTODOLLAR"], () =>
    fetch("https://api.etherscan.io/api?module=stats&action=ethprice")
      .then((r) => r.json())
      .then((r) => BigNumber(r.result.ethusd)),
  );
};
