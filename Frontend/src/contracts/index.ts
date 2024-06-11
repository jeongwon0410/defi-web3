"use client";

import { useMyAccountDev } from "./dev/account";
import { useMainDev } from "./dev/bank";
import {
  useBorrowModalDev,
  useHealthFactorDev,
  useRepayModalDev,
  useSupplyModalDev,
  useWithdrawModalDev,
} from "./dev/modal";
import { useMyAccountProd } from "./prod/account";
import { useMainProd } from "./prod/bank";
import {
  useBorrowModalProd,
  useHealthFactorProd,
  useRepayModalProd,
  useSupplyModalProd,
  useWithdrawModalProd,
} from "./prod/modal";
import {
  UseBorrowModal,
  UseHealthFactor,
  UseMain,
  UseMyAccount,
  UseRepayModal,
  UseSupplyModal,
  UseWithdrawModal,
} from "./type";

export const isDev = false;

// Bank
export const useMain: UseMain = isDev ? useMainDev : useMainProd;

// Account
export const useMyAccount: UseMyAccount = isDev
  ? useMyAccountDev
  : useMyAccountProd;

// Modal
export const useSupplyModal: UseSupplyModal = isDev
  ? useSupplyModalDev
  : useSupplyModalProd;

export const useWithdrawModal: UseWithdrawModal = isDev
  ? useWithdrawModalDev
  : useWithdrawModalProd;

export const useBorrowModal: UseBorrowModal = isDev
  ? useBorrowModalDev
  : useBorrowModalProd;

export const useRepayModal: UseRepayModal = isDev
  ? useRepayModalDev
  : useRepayModalProd;

export const useHealthFactor: UseHealthFactor = isDev
  ? useHealthFactorDev
  : useHealthFactorProd;
