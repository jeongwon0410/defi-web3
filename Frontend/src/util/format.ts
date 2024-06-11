import BigNumber from "bignumber.js";

export const withDash =
  (formatter: (val: BigNumber) => string) => (val?: BigNumber) =>
    val ? formatter(val) : "-";

export const formatTwoDecimal = withDash((val) => val.toFormat(2, 1));

export const formatLiquidity = withDash((val) =>
  formatNumber(parseFloat(val.toString())),
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

// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
export const numberWithCommas = (x: number | bigint) => {
  return x.toLocaleString("en-US");
};

export const formatAccount = (account?: string) => {
  if (account === undefined) return "-";

  if (account.length <= 13) return account;

  return `${account.slice(0, 8)}...${account.slice(-5)}`;
};
