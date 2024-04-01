import BigNumber from "bignumber.js";

export const withDash =
  (formatter: (val: BigNumber) => string) => (val?: BigNumber) =>
    val ? formatter(val) : "-";

export const formatTotalSupply = withDash((val) => val.toString());

export const formatAPY = withDash(
  (val) => parseFloat(val.toString()).toFixed(2) + "%",
);

export const formatLTV = withDash(
  (val) => parseFloat(val.toString()).toFixed(2) + "%",
);

export const formatBalance = withDash((val) => val.toString());

export const formatSupplied = withDash((val) =>
  parseFloat(val.toString()).toFixed(0).toString(),
);

export const formatTotalBorrow = withDash((val) =>
  val
    .toFixed(2)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
);

export const formatLiquidity = withDash((val) =>
  parseFloat(val.toString()).toFixed(2).toString(),
);

export const formatBorrowableAmount = withDash((val) => val.toString());

export const formatDebt = withDash((val) =>
  parseFloat(val.toString()).toFixed(0).toString(),
);

export const formatHealthFactor = withDash((val) =>
  parseFloat(val.toString()).toFixed(2).toString(),
);
