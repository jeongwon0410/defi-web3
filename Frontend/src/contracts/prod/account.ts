import BigNumber from "bignumber.js";
import { MyBorrowRowData, MySupplyRowData } from "../type";
import {
  BN,
  calcLiquidation,
  filterByBalance,
  sumBN,
  unwrap,
  WEI,
} from "../util";
import {
  useUserReserveDatas,
  useReserveConfigurationDatas,
  useReserveDatas,
  useAssetPrices,
} from "./helper";
import { allAssetTitles, allDecimals } from "@/contracts/assets";

import { calcAPY } from "@/util/APY";

export const useMyAccountProd = () => {
  const { data: userReserveDatas } = useUserReserveDatas();
  const { data: prices } = useAssetPrices();
  const { data: configDatas } = useReserveConfigurationDatas();
  const { data: reserveDatas } = useReserveDatas();

  if (userReserveDatas === undefined || prices === undefined)
    return { supplyTable: [], borrowTable: [] };

  const supplies = userReserveDatas.map((x, idx) => {
    return x.result && prices[idx].result
      ? BigNumber(x.result[0].toString())
          .dividedBy(allDecimals[allAssetTitles[idx]])
          .multipliedBy(BN(prices[idx].result)!.dividedBy(WEI))
      : BigNumber(0);
  });

  const borrows = userReserveDatas.map((x, idx) =>
    x.result
      ? BigNumber(x.result[1].toString())
          .dividedBy(allDecimals[allAssetTitles[idx]])
          .multipliedBy(BN(prices[idx].result)!.dividedBy(WEI))
      : BigNumber(0),
  );

  const supplyBalance = supplies && sumBN(supplies);
  const borrowBalance = borrows && sumBN(borrows);

  const supplyTable: MySupplyRowData[] = [
    ...Array(allAssetTitles.length).keys(),
  ]
    .map((idx) => {
      const liquidityRate = unwrap(reserveDatas, idx, 4) as bigint;
      const decimals = allDecimals[allAssetTitles[idx]];

      return {
        assetTitle: allAssetTitles[idx],
        balance: BN(unwrap(userReserveDatas, idx, 0))?.dividedBy(decimals),
        apy: liquidityRate ? calcAPY(liquidityRate) : undefined,
        ltv: BN(unwrap(configDatas, idx, 0) as bigint)?.dividedBy(100),
      };
    })
    .filter(filterByBalance);

  const borrowTable: MyBorrowRowData[] = [
    ...Array(allAssetTitles.length).keys(),
  ]
    .map((idx) => {
      const liquidityRate = unwrap(reserveDatas, idx, 4) as bigint;
      const decimals = allDecimals[allAssetTitles[idx]];

      const supply = BN(unwrap(userReserveDatas, idx, 0))?.dividedBy(decimals);
      const debt = BN(unwrap(userReserveDatas, idx, 1))?.dividedBy(decimals);
      const ltv = BN(unwrap(configDatas, idx, 0) as bigint)?.dividedBy(100);

      return {
        assetTitle: allAssetTitles[idx],
        debt,
        apy: liquidityRate ? calcAPY(liquidityRate) : undefined,
        ltv,
        supply,
        liquidation: calcLiquidation(supply, debt, ltv),
      };
    })
    .filter(filterByBalance);

  return { supplyBalance, borrowBalance, supplyTable, borrowTable };
};
