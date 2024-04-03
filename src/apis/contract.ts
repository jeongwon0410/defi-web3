import BigNumber from "bignumber.js";
import {
  titleToContract,
  pool_data_provider_contract,
  pool_contract,
  aave_oracle_contract,
} from "../constants/contract";
import { AssetTitle, poolAddr, titleToAddr } from "@/constants/assets";
import {
  secondsToYear,
  rayPow,
  RAY,
  RAY_DECIMALS,
  SECONDS_PER_YEAR,
} from "@/util/APY";
import { BigNumberZD, normalizeBN } from "@/util/bignumber";

// SUPPLY

// 토큰의 전체 공급
export const getSupplyTotal = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  // 참고: https://docs.openzeppelin.com/contracts/3.x/erc20
  const decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getReserveData(addr)
    .call();

  const totalAToken = data.totalAToken as bigint;
  const supplyTotal = totalAToken / 10n ** decimals;

  return BigNumber(supplyTotal.toString());
};

/**
 * Compounding interest accrued by deposit or borrow on LendingPool. 투자로 얻는 실제 수익률을 복리로.
 *
 * 0~1 사이의 값을 리턴
 *
 * https://docs.aave.com/developers/v/2.0/guides/apy-and-apr
 */
export const getSupplyAPY = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const data = await pool_contract.methods.getReserveData(addr).call();

  const liquidityRate = data.currentLiquidityRate as bigint;

  const apy = rayPow(
    BigNumberZD(liquidityRate.toString()).dividedBy(SECONDS_PER_YEAR).plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);

  return normalizeBN(apy, RAY_DECIMALS).multipliedBy(100);
};

/**
 * MAX LTV 부채담보부비율
 *
 * 0과 1 사이의 값을 리턴
 */
export const getMaxLTV = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(addr)
    .call();

  const ltv = BigNumber(data.ltv.toString());

  return BigNumber(ltv.dividedBy(100).toString());
};

/**
 * 토큰의 내 계좌 잔고
 */
export const getBalance = async (title: AssetTitle, account: string) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const _balance = (await contract.methods.balanceOf(account).call()) as bigint;

  const decimals = BigNumber(_decimals.toString());
  const balance = BigNumber(_balance.toString());

  return balance.dividedBy(BigNumber(10).pow(decimals));
};

/**
 * 내가 공급한 토큰의 양
 */
export const getMySupplyBalance = async (
  title: AssetTitle,
  account: string,
) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(titleToAddr[title], account)
    .call();

  const currentATokenBalance = BigNumber(data.currentATokenBalance.toString());
  const decimals = BigNumber(_decimals.toString());

  return currentATokenBalance.dividedBy(BigNumber(10).pow(decimals));
};

// BORROW

/**
 * 전체 빌린 금액
 */
export const getBorrowTotal = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const _debt = (await pool_data_provider_contract.methods
    .getTotalDebt(addr)
    .call()) as bigint;

  const decimals = BigNumber(_decimals.toString());
  const debt = BigNumber(_debt.toString());

  return debt.dividedBy(BigNumber(10).pow(decimals));
};

export const getBorrowApy = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const SECONDS_PER_YEAR = secondsToYear();

  const data = await pool_contract.methods.getReserveData(addr).call();
  const _currentVariableBorrowRate = data.currentVariableBorrowRate as bigint;
  const currentVariableBorrowRate = BigNumberZD(
    _currentVariableBorrowRate.toString(),
  );

  const apy = rayPow(
    currentVariableBorrowRate.dividedBy(SECONDS_PER_YEAR).plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);

  return normalizeBN(apy, RAY_DECIMALS).multipliedBy(100);
};

/**
 * 전체 공급
 */
export const getAvailableLiquidity = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const data = await pool_data_provider_contract.methods
    .getReserveData(addr)
    .call();
  const _totalAToken = data.totalAToken as bigint;

  const decimals = await getContactDecimals(title);
  const totalAToken = BigNumber(_totalAToken.toString());

  return totalAToken.dividedBy(decimals);
};

// My Account

export const getDebt = async (title: AssetTitle, account: string) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const data = await pool_data_provider_contract.methods
    .getUserReserveData(addr, account)
    .call();

  const currentVariableDebt = BigNumber(data.currentVariableDebt.toString());
  const decimals = await getContactDecimals(title);

  return currentVariableDebt.dividedBy(decimals);
};

export const getLiquidation = async (title: AssetTitle, account: string) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const data = await pool_data_provider_contract.methods
    .getUserReserveData(addr, account)
    .call();

  // TODO: borrow, supply 0일 때 예외 처리
  const borrow = BigNumber(data.currentVariableDebt.toString());
  const supply = BigNumber(data.currentATokenBalance.toString());
  const result = borrow.dividedBy(supply);

  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(addr)
    .call();

  return result.times(ltv.ltv.toString());
};

// Supply Modal

export const getApprovedAmount = async (title: AssetTitle, account: string) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const data = (await contract.methods
    .allowance(account, poolAddr)
    .call()) as bigint;

  const decimals = await getContactDecimals(title);

  return BigNumber(data.toString()).dividedBy(decimals);
};

/**
 * 토큰 단위로 변경
 */
export const approve = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = await getContactDecimals(title);
  const result = amount.multipliedBy(decimals);

  return new Promise((res, rej) => {
    contract.methods
      .approve(poolAddr, BigInt(result.toString()))
      .send({ from: account })
      .on("error", (error) => {
        rej(new Error(error.message));
      })
      .on("receipt", async (receipt) => {
        receipt.status === 1n
          ? res(undefined)
          : rej(new Error("receipt failed"));
      });
  });
};

export const supply = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const addr = titleToAddr[title];
  const decimals = await getContactDecimals(title);
  const result = amount.multipliedBy(decimals);

  // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
  return new Promise((res, rej) =>
    pool_contract.methods
      .supply(addr, BigInt(result.toString()), account, "0")
      .send({ from: account })
      .on("error", (error) => {
        rej(new Error(error.message));
      })
      .on("receipt", (receipt) => {
        receipt.status === 1n
          ? res(undefined)
          : rej(new Error("receipt failed"));
      }),
  );
};

export const estimateGas = async (
  title: AssetTitle,
  account: string,
  amount: string,
) => {
  const addr = titleToAddr[title];
  const gas = await pool_contract.methods
    .supply(addr, BigInt(amount), account, "0")
    .estimateGas({ from: account });

  return BigNumber(gas.toString());
};
export async function getMaxAmount(title: AssetTitle, account: string) {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _balance = (await contract.methods.balanceOf(account).call()) as bigint;
  const balance = BigNumber(_balance.toString());

  const decimals = await getContactDecimals(title);

  return balance.dividedBy(decimals);
}

// Withdraw modal

export const withdraw = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const decimals = BigNumber(_decimals.toString());

  const result = amount.multipliedBy(BigNumber(10).pow(decimals));

  return new Promise((res, rej) => {
    pool_contract.methods
      .withdraw(addr, BigInt(result.toString()), account)
      .send({ from: account })
      .on("error", (error) => {
        rej(error);
      })
      .on("receipt", (receipt) => {
        receipt.status === 1n
          ? res(undefined)
          : rej(new Error("receipt error"));
      });
  });
};

// Borrow 모달

export const borrow = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const addr = titleToAddr[title];

  const decimals = await getContactDecimals(title);
  const result = amount.multipliedBy(decimals);

  return new Promise((res, rej) =>
    pool_contract.methods
      .borrow(addr, BigInt(result.toString()), 2, "0", account) // TODO, 1 or 2, https://docs.aave.com/developers/core-contracts/pool
      .send({ from: account })
      .on("error", (error) => {
        rej(new Error(error.message));
      })
      .on("receipt", (receipt) => {
        receipt.status === 1n
          ? res(undefined)
          : rej(new Error("receipt failed"));
      }),
  );
};

/**
 * 빌릴 수 있는 금액
 */
export const getBorrowableAmount = async (
  title: AssetTitle,
  account: string,
) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const data = await pool_contract.methods.getUserAccountData(account).call();
  const _availableBorrowsBase = data.availableBorrowsBase as bigint;
  const _price = (await aave_oracle_contract.methods
    .getAssetPrice(addr)
    .call()) as bigint;

  const availableBorrowsBase = BigNumber(_availableBorrowsBase.toString());
  const price = BigNumber(_price.toString());

  return availableBorrowsBase.dividedBy(price.toString()).multipliedBy(0.99);
};

export const getHealthFactor = async (title: AssetTitle, account: string) => {
  const data = await pool_contract.methods.getUserAccountData(account).call();
  // TOOD: 왜 18인지는 모름
  return BigNumber(data.healthFactor.toString()).dividedBy(
    BigNumber(10).pow(18),
  );
};

// Repay Modal
export const repay = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const addr = titleToAddr[title];

  const decimals = await getContactDecimals(title);
  const result = amount.multipliedBy(decimals);

  return new Promise((res, rej) =>
    pool_contract.methods
      .repay(addr, BigInt(result.toString()), 2, account) // TODO, 1 or 2, https://docs.aave.com/developers/core-contracts/pool
      .send({ from: account })
      .on("error", (error) => {
        rej(new Error(error.message));
      })
      .on("receipt", (receipt) => {
        receipt.status === 1n
          ? res(undefined)
          : rej(new Error("receipt failed"));
      }),
  );
};

// Util
const getContactDecimals = async (title: AssetTitle) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const decimals = BigNumber(_decimals.toString());

  return BigNumber(10).pow(decimals);
};
