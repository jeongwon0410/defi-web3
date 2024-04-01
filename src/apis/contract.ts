import BigNumber from "bignumber.js";
import toast from "react-hot-toast";
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
    .getUserReserveData(titleToAddr.DAI, account)
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

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getReserveData(addr)
    .call();
  const _totalAToken = data.totalAToken as bigint;

  const decimals = BigNumber(_decimals.toString());
  const totalAToken = BigNumber(_totalAToken.toString());

  return totalAToken.dividedBy(BigNumber(10).pow(decimals));
};

// My Account

export const getDebt = async (title: AssetTitle, account: string) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(addr, account)
    .call();

  const currentVariableDebt = BigNumber(data.currentVariableDebt.toString());
  const decimals = BigNumber(_decimals.toString());

  return currentVariableDebt.dividedBy(10).pow(decimals);
};

export const getLiquidation = async (title: AssetTitle, account: string) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = BigNumber(
    ((await contract.methods.decimals().call()) as bigint).toString(),
  );

  const data = await pool_data_provider_contract.methods
    .getUserReserveData(addr, account)
    .call();

  // TODO: borrow, supply 0일 때 예외 처리
  const borrow = BigNumber(data.currentVariableDebt.toString());
  const supply = BigNumber(data.currentATokenBalance.toString());

  const tmp = BigNumber(10).pow(decimals);
  const result = borrow.dividedBy(tmp).dividedBy(supply).dividedBy(tmp);

  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(addr)
    .call();

  return result.times(ltv.ltv.toString());
};

// Supply Modal

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

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const decimals = BigNumber(_decimals.toString());

  const result = amount.multipliedBy(BigNumber(10).pow(decimals));

  await contract.methods
    .approve(poolAddr, result.toString())
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error) => {
      toast.error(error.message);
      console.log(error.message);
    })
    .on("receipt", (receipt) => {
      console.log(receipt);
      if (receipt.status === 1n) {
        toast.success("Transaction Success");
        // setApproveFlag(false);
      } else {
        toast.error("Transaction Failed");
        // setApproveFlag(false);
      }
    });
};

export const supply = async (
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

  await pool_contract.methods
    .supply(addr, parseFloat(result.toString()), account, "0")
    .send({ from: account })
    .on("transactionHash", (hash) => {
      toast.success(`TX Hash Supply: ${hash}`);
    })
    .on("error", (error) => {
      toast.error(error.message);
      console.log(error.message);
    })
    .on("receipt", (receipt) => {
      console.log(receipt);
      if (receipt.status == 1n) {
        toast.success("Transaction Success");
      } else {
        toast.error("Transaction Failed");
      }
    });
};

export async function getMaxAmount(title: AssetTitle, account: string) {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as bigint;
  const _balance = (await contract.methods.balanceOf(account).call()) as bigint;

  const decimals = BigNumber(_decimals.toString());
  const balance = BigNumber(_balance.toString());

  return balance.dividedBy(BigNumber(10).pow(decimals));
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

  await pool_contract.methods
    .withdraw(addr, result, account)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Supply", hash);
      // setDisable(true);
      // setFlag(true);
    })
    .on("error", (error) => {
      console.log("Withdraw Error", error);
    })
    .on("receipt", (receipt) => {
      if (receipt.status == 1n) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
};

// Borrow Modal

export const borrow = async (
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

  await pool_contract.methods
    .borrow(addr, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Borrow", hash);
      // setDisable(true);
      // setFlag(true);
    })
    .on("error", (error) => {
      console.log("Borrow Error", error);
    })
    .on("receipt", (receipt) => {
      console.log("Mined", receipt);
      if (receipt.status === 1n) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
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

// Repay Modal
export const repay = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const _decimals = (await contract.methods.decimals().call()) as BigNumber;
  const decimals = BigNumber(_decimals);

  const result = amount.multipliedBy(BigNumber(10).pow(decimals));

  await pool_contract.methods
    .repay(addr, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt) => {
      if (receipt.status === 1n) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
};
