import { BigNumber } from "bignumber.js";
import {
  ModalStatus,
  ApproveModalStatus,
  MyBorrowRowData,
  MySupplyRowData,
} from "./type";

export const BN = (x: bigint | number | undefined | boolean) => {
  if (typeof x === "boolean") {
    console.error("Wrong contract");
    return undefined;
  }

  return x === undefined ? undefined : BigNumber(x.toString());
};

export const unwrap = <T>(
  x:
    | (
        | {
            error?: undefined;
            result: readonly T[];
            status: "success";
          }
        | {
            error: Error;
            result?: undefined;
            status: "failure";
          }
      )[]
    | undefined,
  idx1: number,
  idx2: number,
) => {
  if (x === undefined) return undefined;
  const result = x[idx1].result;
  if (result === undefined) return undefined;
  return result[idx2];
};

export const getStatus = (
  amount: BigNumber,
  isLoading: boolean,
  isSuccess: boolean,
): ModalStatus => {
  if (isSuccess) return "success";
  if (amount.isNaN() || amount.isEqualTo(0)) return "disabled";
  return isLoading ? "loading" : "ready";
};

export const getApproveStatus = (
  amount: BigNumber,
  isApproveLoading: boolean,
  isApproveSuccess: boolean,
  isSupplyLoading: boolean,
  isSupplySuccess: boolean,
  approvedAmount?: BigNumber,
): ApproveModalStatus => {
  const isDisabled = amount === undefined || amount.isEqualTo(0);
  if (isDisabled) return "disabled";

  if (isSupplyLoading) return "supplyLoading";
  else if (isApproveLoading) return "approveLoading";

  // TODO
  const isApproved =
    isApproveSuccess ||
    (amount && approvedAmount && amount.comparedTo(approvedAmount) <= 0);

  if (isApproved) return "approved";
  else if (isSupplySuccess) return "success";
  else return "approveNeeded";
};

export const sumBN = (arr: BigNumber[]) =>
  arr.reduce((prev, cur) => prev.plus(cur), BigNumber(0));

export const filterByBalance = (data: MySupplyRowData | MyBorrowRowData) => {
  return "debt" in data
    ? data.debt && data.debt.gte(0.01)
    : data.balance && data.balance.gte(0.01);
};

export const WEI = BigNumber(10).pow(18);

export const RAY = BigNumber(10).pow(27);

export const calcLiquidation = (
  supply?: BigNumber,
  borrow?: BigNumber,
  ltv?: BigNumber,
) => {
  if (supply === undefined || borrow === undefined || ltv === undefined)
    return undefined;
  if (supply.isEqualTo(0) || ltv.isEqualTo(0)) return undefined;

  return borrow.dividedBy(supply.times(ltv));
};

// h = (s-x)*l/b
// b = (s-x)*l
// x = s-b/l
export const calcWithdrawable = (
  supply: BigNumber | undefined,
  borrow: BigNumber | undefined,
  liquidationThreshold: BigNumber | undefined,
  price: BigNumber | undefined,
) => {
  if (
    supply === undefined ||
    borrow === undefined ||
    liquidationThreshold === undefined ||
    price === undefined
  )
    return undefined;

  return supply.minus(borrow.dividedBy(liquidationThreshold)).dividedBy(price);
};

export const remainTwoDecimal = (value: BigNumber) =>
  BigNumber(value.toFixed(2, 1));
