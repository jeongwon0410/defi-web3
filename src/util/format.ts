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

export const formatBalance = withDash((val) =>
  parseFloat(val.toString()).toFixed(2).toString(),
);

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
  formatNumber(parseFloat(val.toString())),
);

export const formatBorrowableAmount = withDash((val) => val.toString());

export const formatDebt = withDash((val) =>
  parseFloat(val.toString()).toFixed(0),
);

export const formatHealthFactor = withDash((val) =>
  parseFloat(val.toString()).toFixed(2),
);

export const formatLiquidation = withDash((val) =>
  parseFloat(val.toString()).toFixed(0),
);

export const formatGas = withDash((val) =>
  parseFloat(val.toString()).toFixed(2),
);

export const formatNumber = (num: number, precision = 2) => {
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num.toString();
};
