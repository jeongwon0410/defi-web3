import useSWR from "swr";
import {
  getSupplyTotal,
  getSupplyAPY,
  getMaxLTV,
  getBalance,
  getMySupplyBalance,
  getBorrowTotal,
  getBorrowApy,
  getBorrowAmount,
  getBorrowableAmount,
} from "./contract";
import { AssetTitle } from "@/constants/assets";
import { useTmpContext } from "@/components/TmpContext";
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
  const { address } = useTmpContext();

  return useSWR(
    title && address ? [type, title, address] : null,
    privateContractFetcher,
  );
};

export type ContractType =
  | "SUPPLYTOTAL"
  | "SUPPLYAPY"
  | "MAXLTV"
  | "BORROWTOTAL"
  | "BORROWAPY";

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
  }
};

export type PrivateContractType =
  | "BALANCE"
  | "SUPPLYBALANCE"
  | "BORROWAMOUNT"
  | "BORROWABLEAMOUNT";

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
      return getBorrowAmount(title, account);
    case "BORROWABLEAMOUNT":
      return getBorrowableAmount(title, account);
  }
};
