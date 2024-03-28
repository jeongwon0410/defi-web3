import BigNumber from "bignumber.js";
import {
  titleToContract,
  pool_data_provider_contract,
  pool_contract,
  aave_oracle_contract,
} from "../constants/contract";
import { AssetTitle, poolAddr, titleToAddr } from "@/constants/assets";
import { valueToZDBigNumber } from "@/util/bignumber";
import { secondsToYear, rayPow } from "@/util/APY";

// SUPPLY

export const getSupplyTotal = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getReserveData(addr)
    .call();

  const totalAToken = data.totalAToken as bigint;
  const supplyTotal = totalAToken / 10n ** decimals;

  return BigNumber(supplyTotal.toString());
};

export const getSupplyAPY = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const RAY = 10 ** 27; // 10 to the power 27
  const SECONDS_PER_YEAR = secondsToYear();

  const data = await pool_contract.methods.getReserveData(addr).call();
  const currentLiquidityRate = BigNumber(data.currentLiquidityRate.toString());

  const apy = rayPow(
    valueToZDBigNumber(currentLiquidityRate.toString())
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);

  return apy;
};

export const getMaxLTV = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(addr)
    .call();

  return BigNumber(data.ltv.toString());
};

export const getBalance = async (title: AssetTitle, account: string) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const balance = (await contract.methods.balanceOf(account).call()) as bigint;

  return BigNumber(balance.toString()).dividedBy(
    BigNumber(10).pow(BigNumber(decimals.toString())),
  );
};

export const getMySupplyBalance = async (
  title: AssetTitle,
  account: string,
) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(titleToAddr.DAI, account)
    .call();

  const currentATokenBalance = BigNumber(data.currentATokenBalance.toString());

  return currentATokenBalance.dividedBy(
    BigNumber(10).pow(BigNumber(decimals.toString())),
  );
};

// BORROW

export const getBorrowTotal = async (title: AssetTitle) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const data = (await pool_data_provider_contract.methods
    .getTotalDebt(addr)
    .call()) as bigint;

  return BigNumber((data / 10n ** decimals).toString());
};

export const getBorrowApy = async (title: AssetTitle) => {
  const addr = titleToAddr[title];

  const RAY = 10 ** 27;
  const SECONDS_PER_YEAR = secondsToYear();

  const data = await pool_contract.methods.getReserveData(addr).call();
  const currentVariableBorrowRate = data.currentVariableBorrowRate as bigint;

  return rayPow(
    valueToZDBigNumber(currentVariableBorrowRate.toString())
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
};

// My Account

export const getBorrowAmount = async (title: AssetTitle, account: string) => {
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

// TODO: error handling .on(error), .on(receipt)
export const approve = async (
  title: AssetTitle,
  account: string,
  amount: BigNumber,
) => {
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const result = amount.multipliedBy(
    BigNumber(10).pow(BigNumber(decimals.toString())),
  );

  await contract.methods
    .approve(poolAddr, result)
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Approve", hash);
      // setApproveDisable(true);
      // setApproveFlag(true);
    })
    .on("error", (error) => {
      console.log("Approve Error", error);
      // setApproveFlag(false);
    })
    .on("receipt", (receipt) => {
      if (receipt.status === 1n) {
        console.log("Transaction Success");
        // setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
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

  const decimals = (await contract.methods.decimals().call()) as bigint;
  const result = amount.multipliedBy(BigNumber(10).pow(decimals.toString()));

  await pool_contract.methods
    .supply(addr, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash) => {
      console.log("TX Hash Supply", hash);
      // setDisable(true);
      // setFlag(true);
    })
    .on("error", (error) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt) => {
      if (receipt.status == 1n) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
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

export const borrowableAmount = async (title: AssetTitle, account: string) => {
  const addr = titleToAddr[title];
  const contract = titleToContract[title];
  if (contract === null) throw new Error();

  const currency = await pool_contract.methods
    .getUserAccountData(account)
    .call();

  const price = (await aave_oracle_contract.methods
    .getAssetPrice(addr)
    .call()) as bigint;

  const maxUserAmountToBorrow = BigNumber(
    currency.availableBorrowsBase.toString(),
  )
    .dividedBy(price.toString())
    .multipliedBy(0.99);

  return maxUserAmountToBorrow;
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
      // setDisable(true);
      // setFlag(true);
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
