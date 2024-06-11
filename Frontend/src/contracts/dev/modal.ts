import BigNumber from "bignumber.js";
import { useState } from "react";
import { QueryKey } from "@tanstack/react-query";
import {
  BN,
  calcWithdrawable,
  getApproveStatus,
  getStatus,
  remainTwoDecimal,
} from "../util";
import { ModalType } from "../type";
import {
  allDecimals,
  AssetTitle,
  poolAddr,
  titleToABI,
  titleToAddr,
} from "@/contracts/assets";
import {
  useUserAccountData,
  useAssetPrice,
  useAllowance,
  useBalanceOf,
  useUserReserveData,
} from "@/contracts/dev/helper";
import pool from "@/contracts/dev/abi/Pool";
import {
  useCloseModal,
  useInvalidateKeyOnSuccess,
  useReward,
  useWaitingWriteContract,
} from "@/util/hook";

const useModalContract = (
  title: AssetTitle,
  type: "supply" | "withdraw" | "borrow" | "repay",
) => {
  const { address, writeContract, isLoading, isSuccess } =
    useWaitingWriteContract();

  const action = (amount: BigNumber) => {
    if (address === undefined) return;
    const decimals = allDecimals[title];

    switch (type) {
      case "supply":
        writeContract({
          abi: pool,
          address: poolAddr,
          functionName: "supply",
          args: [
            titleToAddr[title],
            BigInt(amount.multipliedBy(decimals).toFixed(0)),
            address,
            0,
          ],
        });
        break;
      case "withdraw":
        writeContract({
          abi: pool,
          address: poolAddr,
          functionName: "withdraw",
          args: [
            titleToAddr[title],
            BigInt(amount.multipliedBy(decimals).toFixed(0)),
            address,
          ],
        });
        break;
      case "borrow":
        writeContract({
          abi: pool,
          address: poolAddr,
          functionName: "borrow",
          args: [
            titleToAddr[title],
            BigInt(amount.multipliedBy(decimals).toFixed(0)),
            2n,
            0,
            address,
          ],
        });
        break;
      case "repay":
        writeContract({
          abi: pool,
          address: poolAddr,
          functionName: "repay",
          args: [
            titleToAddr[title],
            BigInt(amount.multipliedBy(decimals).toFixed(0)),
            2n,
            address,
          ],
        });
        break;
    }
  };

  return { action, isLoading, isSuccess };
};

const useApprove = (title: AssetTitle, queryKey: QueryKey) => {
  const { address, writeContract, isLoading, isSuccess } =
    useWaitingWriteContract();

  useInvalidateKeyOnSuccess(queryKey, isSuccess);

  const approve = (amount: BigNumber) => {
    if (address === undefined) return;

    const value = BigInt(amount.multipliedBy(allDecimals[title]).toFixed(0));
    writeContract({
      abi: titleToABI[title],
      address: titleToAddr[title],
      functionName: "approve",
      args: [poolAddr, value],
    });
  };

  return { approve, isLoading, isSuccess };
};

const useModal = (type: ModalType, title: AssetTitle, close: () => void) => {
  const { action, isLoading, isSuccess } = useModalContract(title, type);
  const [amount, setAmount] = useState(BigNumber(0));
  useCloseModal(isSuccess, close, `${title} ${type}`);

  const status = getStatus(amount, isLoading, isSuccess);

  return { action: () => action(amount), amount, setAmount, status };
};

const useApproveModalDev = (
  type: ModalType,
  title: AssetTitle,
  close: () => void,
) => {
  const {
    action,
    isLoading: isActionLoading,
    isSuccess: isActionSuccess,
  } = useModalContract(title, type);

  const [amount, setAmount] = useState(BigNumber(0));
  const { data: allowance, queryKey } = useAllowance(title);

  const {
    approve,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
  } = useApprove(title, queryKey);

  useCloseModal(isActionSuccess, close, `${title} ${type}`);

  const decimals = allDecimals[title];
  const approvedAmount =
    allowance !== undefined
      ? BigNumber((allowance as bigint).toString()).dividedBy(decimals)
      : undefined;

  const status = getApproveStatus(
    amount,
    isApproveLoading,
    isApproveSuccess,
    isActionLoading,
    isActionSuccess,
    approvedAmount,
  );

  return { approve, action: () => action(amount), amount, setAmount, status };
};

export const useSupplyModalDev = (title: AssetTitle, close: () => void) => {
  const {
    approve,
    action: supply,
    amount,
    setAmount,
    status,
  } = useApproveModalDev("supply", title, close);

  const { data } = useBalanceOf(title);
  const balance =
    data !== undefined ? BN(data)?.dividedBy(allDecimals[title]) : undefined;

  return { approve, supply, amount, setAmount, status, balance };
};

export const useWithdrawModalDev = (
  assetTitle: AssetTitle,
  close: () => void,
) => {
  const {
    action: withdraw,
    amount,
    setAmount,
    status,
  } = useModal("withdraw", assetTitle, close);

  const { data } = useUserAccountData();

  const supply = data && BigNumber(data[0].toString());
  const borrow = data && BigNumber(data[1].toString());
  const threshold = data && BigNumber(data[3].toString());
  const price = useAssetPrice(assetTitle);

  const withdrawable = calcWithdrawable(
    supply?.dividedBy(BigNumber(10).pow(8)),
    borrow?.dividedBy(BigNumber(10).pow(8)),
    threshold?.dividedBy(10000),
    price,
  );

  return { withdraw, status, amount, setAmount, withdrawable };
};

export const useBorrowModalDev = (
  assetTitle: AssetTitle,
  close: () => void,
) => {
  const {
    action: borrow,
    amount,
    setAmount,
    status,
  } = useModal("borrow", assetTitle, close);

  const price = useAssetPrice(assetTitle);
  const { data: _balance } = useBalanceOf(assetTitle);
  const { data: accountData } = useUserAccountData();

  useReward(
    status === "success",
    "borrow",
    price && amount.multipliedBy(price).toNumber(),
  );

  const decimals = allDecimals[assetTitle];
  const balance =
    _balance !== undefined ? BN(_balance)?.dividedBy(decimals) : undefined;
  const borrowable =
    price &&
    BN(accountData?.[2])
      ?.dividedBy(price)
      .dividedBy(10 ** 8)
      .multipliedBy(0.99);

  return { borrow, status, balance, borrowable, amount, setAmount };
};

export const useRepayModalDev = (title: AssetTitle, close: () => void) => {
  const {
    approve,
    action: repay,
    amount,
    setAmount,
    status,
  } = useApproveModalDev("repay", title, close);

  const { data: _balance } = useBalanceOf(title);
  const balance =
    _balance !== undefined
      ? BN(_balance)?.dividedBy(allDecimals[title])
      : undefined;

  const { data } = useUserReserveData(title);
  const decimals = allDecimals[title];
  const myDebt = BN(data?.[2])?.dividedBy(decimals);

  const repayable =
    balance && myDebt && remainTwoDecimal(BigNumber.min(balance, myDebt));

  console.log(remainTwoDecimal(BigNumber(1000)).toString());

  return { approve, repay, amount, setAmount, status, myDebt, repayable };
};

export const useHealthFactorDev = (
  type: "borrow" | "repay",
  amount: BigNumber,
  title: AssetTitle,
) => {
  const { data } = useUserAccountData();
  const cost = useAssetPrice(title);

  if (data === undefined || cost === undefined) return undefined;

  const totalSupply = BigNumber(data[0].toString());
  const totalBorrow = BigNumber(data[1].toString());
  const liquidationThreshold = BigNumber(data[3].toString());

  // TODO: 얼마면 0일지
  if (totalBorrow.lt(100000)) return undefined;

  const base = 10 ** 8;
  const denom = totalSupply
    .dividedBy(base)
    .multipliedBy(liquidationThreshold.dividedBy(10 ** 4));

  return type === "borrow"
    ? denom.dividedBy(
        totalBorrow.dividedBy(base).plus(amount.multipliedBy(cost)),
      )
    : denom.dividedBy(
        totalBorrow.dividedBy(base).minus(amount.multipliedBy(cost)),
      );
};
