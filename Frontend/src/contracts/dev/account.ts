import BigNumber from "bignumber.js";
import { MyBorrowRowData, MySupplyRowData } from "../type";
import { BN, calcLiquidation, filterByBalance, sumBN, unwrap } from "../util";
import { allAssetTitles, allDecimals } from "@/contracts/assets";
import {
  useAssetPrices,
  useUserReserveDatas,
  useAaveReserveDatas,
  useReserveConfigurationDatas,
} from "@/contracts/dev/helper";
import { calcAPY } from "@/util/APY";

export const useMyAccountDev = () => {
  const { data: userReserveDatas } = useUserReserveDatas();
  const { data: prices } = useAssetPrices();
  const { data: reserveDatas } = useAaveReserveDatas();
  const { data: configDatas } = useReserveConfigurationDatas();

  if (userReserveDatas === undefined || prices === undefined)
    return { supplyTable: [], borrowTable: [] };

  const supplies = userReserveDatas.map((x, idx) => {
    return x.result && prices[idx].result
      ? BigNumber(x.result[0].toString())
          .dividedBy(allDecimals[allAssetTitles[idx]])
          .multipliedBy(BN(prices[idx].result)!.dividedBy(10 ** 8))
      : BigNumber(0);
  });

  const borrows = userReserveDatas.map((x, idx) =>
    x.result
      ? BigNumber(x.result[2].toString())
          .dividedBy(allDecimals[allAssetTitles[idx]])
          .multipliedBy(BN(prices[idx].result)!.dividedBy(10 ** 8))
      : BigNumber(0),
  );

  const supplyBalance = supplies && sumBN(supplies);
  const borrowBalance = borrows && sumBN(borrows);

  const supplyTable: MySupplyRowData[] = [
    ...Array(allAssetTitles.length).keys(),
  ]
    .map((idx) => {
      const tmp = unwrap(reserveDatas, idx, 5);
      const decimals = allDecimals[allAssetTitles[idx]];

      return {
        assetTitle: allAssetTitles[idx],
        balance: BN(unwrap(userReserveDatas, idx, 0))?.dividedBy(decimals),
        apy: tmp ? calcAPY(tmp) : undefined,
        ltv: BN(unwrap(configDatas, idx, 1))?.dividedBy(100),
      };
    })
    .filter(filterByBalance);

  const borrowTable: MyBorrowRowData[] = [
    ...Array(allAssetTitles.length).keys(),
  ]
    .map((idx) => {
      const tmp = unwrap(reserveDatas, idx, 4);
      const decimals = allDecimals[allAssetTitles[idx]];

      const supply = BN(unwrap(userReserveDatas, idx, 0))?.dividedBy(decimals);
      const debt = BN(unwrap(userReserveDatas, idx, 2))?.dividedBy(decimals);
      const ltv = BN(unwrap(configDatas, idx, 1))?.dividedBy(100);

      return {
        assetTitle: allAssetTitles[idx],
        debt,
        apy: tmp ? calcAPY(tmp) : undefined,
        ltv,
        supply,
        liquidation: calcLiquidation(supply, debt, ltv),
      };
    })
    .filter(filterByBalance);

  return { supplyBalance, borrowBalance, supplyTable, borrowTable };
};
