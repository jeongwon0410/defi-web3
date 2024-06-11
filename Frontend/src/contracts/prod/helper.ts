import { useAccount, useReadContract, useReadContracts } from "wagmi";
import {
  allAssetTitles,
  AssetTitle,
  lendingPoolAddr,
  priceOracleAddr,
  titleToABI,
  titleToAddr,
} from "../assets";
import { BN, WEI } from "../util";
import LendingPool_ABI from "./abi/LendingPool_ABI";
import IPriceOracleGetter_ABI from "./abi/IPriceOracleGetter_ABI";

// MEMO: v3의 useTotalDebts에 해당하는 함수가 없음
// liquidityRate를 RAY로 나누는 여부

/**
 * Returns global information on any asset reserve pool
 *
 * - totalLiquidity: reserve total liquidity
 * - availableLiquidity: reserve available liquidity for borrowing
 * - totalBorrowsStable: total amount of outstanding borrows at Stable rate
 * - totalBorrowsVariable: total amount of outstanding borrows at Variable rate
 * - liquidityRate: current deposit APY of the reservefor depositors, in Ray units.
 * - variableBorrowRate: current variable rate APY of the reserve pool, in Ray units.
 * - stableBorrowRate: current stable rate APY of the reserve pool, in Ray units.
 * - averageStableBorrowRate: current average stable borrow rate
 * - utilizationRate:  expressed as total borrows/total liquidity.
 * - liquidityIndex: cumulative liquidity index
 * - variableBorrowIndex: cumulative variable borrow index
 * - aTokenAddress: aTokens contract address for the specific _reserve
 * - lastUpdateTimestamp: timestamp of the last update of reserve data
 */
export const useReserveDatas = () =>
  useReadContracts({
    contracts: allAssetTitles.map(
      (title) =>
        ({
          abi: LendingPool_ABI,
          address: lendingPoolAddr,
          functionName: "getReserveData",
          args: [titleToAddr[title]],
        }) as const,
    ),
  });

/**
 * Returns the current total aToken balance of _user all interest collected included.
 *
 * aToken balance of the user, in wei units.
 */
export const useBalanceOf = (title: AssetTitle) => {
  const { address } = useAccount();
  return useReadContract({
    abi: titleToABI[title],
    address: titleToAddr[title],
    functionName: "balanceOf",
    args: address && [address],
  });
};

/**
 * Returns the current total aToken balance of _user all interest collected included.
 *
 * aToken balance of the user, in wei units.
 */
export const useBalancesOf = () => {
  const { address } = useAccount();

  return useReadContracts({
    contracts: allAssetTitles.map(
      (title) =>
        ({
          abi: titleToABI[title],
          address: titleToAddr[title],
          functionName: "balanceOf",
          args: address && [address],
        }) as const,
    ),
  });
};

/**
 * Returns information related to the user data on a specific reserve
 *
 * - currentATokenBalance: user current reserve aToken balance
 * - currentBorrowBalance: user current reserve outstanding borrow balance
 * - principalBorrowBalance: user balance of borrowed asset
 * - borrowRateMode: user borrow rate mode either Stable or Variable
 * - borrowRate: user current borrow rate APY
 * - liquidityRate: user current earn rate on _reserve
 * - originationFee: user outstanding loan origination fee
 * - variableBorrowIndex: user variable cumulative index
 * - lastUpdateTimestamp: Timestamp of the last data update
 * - usageAsCollateralEnabled: Whether the user's current reserve is enabled as a collateral
 */
export const useUserReserveData = (title: AssetTitle) => {
  const { address } = useAccount();

  return useReadContract({
    abi: LendingPool_ABI,
    address: lendingPoolAddr,
    functionName: "getUserReserveData",
    args: address && [titleToAddr[title], address],
  });
};

/**
 * Returns information related to the user data on a specific reserve
 *
 * - currentATokenBalance: user current reserve aToken balance
 * - currentBorrowBalance: user current reserve outstanding borrow balance
 * - principalBorrowBalance: user balance of borrowed asset
 * - borrowRateMode: user borrow rate mode either Stable or Variable
 * - borrowRate: user current borrow rate APY
 * - liquidityRate: user current earn rate on _reserve
 * - originationFee: user outstanding loan origination fee
 * - variableBorrowIndex: user variable cumulative index
 * - lastUpdateTimestamp: Timestamp of the last data update
 * - usageAsCollateralEnabled: Whether the user's current reserve is enabled as a collateral
 */
export const useUserReserveDatas = () => {
  const { address } = useAccount();

  return useReadContracts({
    contracts: allAssetTitles.map(
      (title) =>
        ({
          abi: LendingPool_ABI,
          address: lendingPoolAddr,
          functionName: "getUserReserveData",
          args: address && [titleToAddr[title], address],
        }) as const,
    ),
  });
};

/**
 * Returns specific reserve's configuration parameters.
 *
 * - ltv: Loan-to-value. Value in percentage
 * - liquidationThreshold: liquidation threshold. Value in percentage
 * - liquidationDiscount: liquidation bonus. Value in percentage
 * - interestRateStrategyAddress: address of the contract defining the interest rate strategy
 * - usageAsCollateralEnabled: if true, reserve asset can be used as collateral for borrowing
 * - borrowingEnabled: if true, reserve asset can be borrowed
 * - stableBorrowRateEnabled: if true, reserve asset can be borrowed with stable rate mode
 * - isActive: if true, users can interact with reserve asset
 */
export const useReserveConfigurationDatas = () =>
  useReadContracts({
    contracts: allAssetTitles.map(
      (title) =>
        ({
          abi: LendingPool_ABI,
          address: lendingPoolAddr,
          functionName: "getReserveConfigurationData",
          args: [titleToAddr[title]],
        }) as const,
    ),
  });

/** Returns the price of the supported _asset in ETH wei units. */
export const useAssetPrice = (title: AssetTitle) => {
  const { data } = useReadContract({
    abi: IPriceOracleGetter_ABI,
    address: priceOracleAddr,
    functionName: "getAssetPrice",
    args: [titleToAddr[title]],
  });

  return BN(data)?.dividedBy(WEI);
};

/** Returns the price of the supported _asset in ETH wei units. */
export const useAssetPrices = () =>
  useReadContracts({
    contracts: allAssetTitles.map(
      (title) =>
        ({
          abi: IPriceOracleGetter_ABI,
          address: priceOracleAddr,
          functionName: "getAssetPrice",
          args: [titleToAddr[title]],
        }) as const,
    ),
  });

export const useAllowance = (title: AssetTitle) => {
  const { address } = useAccount();
  return useReadContract({
    abi: titleToABI[title],
    functionName: "allowance",
    address: titleToAddr[title],
    args: address && [address, lendingPoolAddr], // TODO: 이 주소가 맞나?
  });
};

/**
 * - totalLiquidityETH: user aggregated deposits across all the reserves. In Wei
 * - totalCollateralETH: user aggregated collateral across all the reserves. In Wei
 * - totalBorrowsETH: user aggregated outstanding borrows across all the reserves. In Wei
 * - totalFeesETH: user aggregated current outstanding fees in ETH. In Wei
 * - availableBorrowsETH: user available amount to borrow in ETH
 * - currentLiquidationThreshold: user current average liquidation threshold across all the collaterals deposited
 * - ltv: user average Loan-to-Value between all the collaterals
 * - healthFactor: user current Health Factor
 */
export const useUserAccountData = () => {
  const { address } = useAccount();
  return useReadContract({
    abi: LendingPool_ABI,
    address: lendingPoolAddr,
    functionName: "getUserAccountData",
    args: address && [address],
  });
};
