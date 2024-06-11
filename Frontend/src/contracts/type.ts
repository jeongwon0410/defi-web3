import BigNumber from "bignumber.js";
import { DispatchWithoutAction, Dispatch, SetStateAction } from "react";
import { AssetTitle } from "./assets";

// Main
export type GetTotalMarketValue = () => Promise<BigNumber>;

// Bank
export type Tab = "supply" | "borrow";

export type ModalType = "supply" | "borrow" | "withdraw" | "repay";

export type OpenModal = (modal: ModalType, title: AssetTitle) => void;

export type SupplyRowData = {
  assetTitle: AssetTitle;
  totalSupplied?: BigNumber;
  apy?: BigNumber;
  ltv?: BigNumber;
  available?: BigNumber;
  supplied?: BigNumber;
};

export type BorrowRowData = {
  assetTitle: AssetTitle;
  totalBorrowed?: BigNumber;
  apy?: BigNumber;
  liquidity?: BigNumber;
  status?: BigNumber;
  ltv?: BigNumber;
};

export type UseMain = () => {
  expanded: boolean;
  toggle: DispatchWithoutAction;
  tab: Tab;
  setTab: Dispatch<SetStateAction<Tab>>;
  modal: {
    type: ModalType;
    assetTitle: AssetTitle;
  } | null;
  openModal: OpenModal;
  closeModal: () => void;
  supplyTableData: SupplyRowData[];
  borrowTableData: BorrowRowData[];
};

// Account

export type UseHeader = () => BigNumber | undefined;

export type UseMyAccount = () => {
  supplyBalance?: BigNumber;
  supplyTable: MySupplyRowData[];
  borrowBalance?: BigNumber;
  borrowTable: MyBorrowRowData[];
};

export type MySupplyRowData = {
  assetTitle: AssetTitle;
  balance?: BigNumber;
  apy?: BigNumber;
  ltv?: BigNumber;
};

export type MyBorrowRowData = {
  assetTitle: AssetTitle;
  debt: BigNumber | undefined;
  apy: BigNumber | undefined;
  ltv: BigNumber | undefined;
  liquidation: BigNumber | undefined;
};

// Modal

export type ModalStatus = "disabled" | "ready" | "loading" | "success";
export type ApproveModalStatus =
  | "disabled"
  | "approveNeeded"
  | "supplyLoading"
  | "approveLoading"
  | "approved"
  | "success";

export type UseSupplyModal = (
  assetTitle: AssetTitle,
  close: () => void,
) => {
  approve: (amount: BigNumber) => void;
  supply: (amount: BigNumber) => void;
  status: ApproveModalStatus;
  amount: BigNumber;
  setAmount: Dispatch<SetStateAction<BigNumber>>;
  balance?: BigNumber;
};

export type UseRepayModal = (
  title: AssetTitle,
  close: () => void,
) => {
  approve: (amount: BigNumber) => void;
  repay: (amount: BigNumber) => void;
  status: ApproveModalStatus;
  amount: BigNumber;
  setAmount: Dispatch<SetStateAction<BigNumber>>;
  myDebt?: BigNumber;
  repayable?: BigNumber;
};

export type UseBorrowModal = (
  assetTitle: AssetTitle,
  close: () => void,
) => {
  borrow: () => void;
  borrowable?: BigNumber;
  status: ModalStatus;
  amount: BigNumber;
  setAmount: Dispatch<SetStateAction<BigNumber>>;
  balance?: BigNumber;
};

export type UseWithdrawModal = (
  assetTitle: AssetTitle,
  close: () => void,
) => {
  withdraw: () => void;
  withdrawable?: BigNumber;
  status: ModalStatus;
  amount: BigNumber;
  setAmount: Dispatch<SetStateAction<BigNumber>>;
};

export type UseHealthFactor = (
  type: "borrow" | "repay",
  amount: BigNumber,
  title: AssetTitle,
) => BigNumber | undefined;
