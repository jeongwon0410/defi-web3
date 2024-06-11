import { useQueryClient } from "@tanstack/react-query";
import { useReducer, useState } from "react";

import {
  Tab,
  ModalType,
  OpenModal,
  SupplyRowData,
  BorrowRowData,
} from "../type";
import { BN, unwrap, WEI } from "../util";
import {
  useBalancesOf,
  useUserReserveDatas,
  useReserveConfigurationDatas,
  useAssetPrices,
  useReserveDatas,
} from "./helper";
import { allAssetTitles, allDecimals, AssetTitle } from "@/contracts/assets";
import { calcAPY } from "@/util/APY";

export const useMainProd = () => {
  const [expanded, toggle] = useReducer((x) => !x, false);
  const [tab, setTab] = useState<Tab>("supply");

  const [modal, setModal] = useState<{
    type: ModalType;
    assetTitle: AssetTitle;
  } | null>(null);

  const { data: supplyTableData, invalidate: invalidateSupplyTable } =
    useSupplyTableDev();
  const { data: borrowTableData, invalidate: invalidateBorrowTable } =
    useBorrowTableDev();

  const closeModal = () => {
    invalidateSupplyTable();
    invalidateBorrowTable();
    setModal(null);
  };

  const openModal: OpenModal = (type, assetTitle) =>
    setModal({ type, assetTitle });

  return {
    expanded,
    toggle,
    tab,
    setTab,
    modal,
    openModal,
    closeModal,
    supplyTableData,
    borrowTableData,
  };
};

const useSupplyTableDev = () => {
  const { data: reserveData, queryKey: q1 } = useReserveDatas();
  const { data: balance, queryKey: q2 } = useBalancesOf();
  const { data: userReserveData, queryKey: q3 } = useUserReserveDatas();
  const { data: reserveConfigurationData, queryKey: q4 } =
    useReserveConfigurationDatas();
  const client = useQueryClient();

  const data: SupplyRowData[] = [...Array(allAssetTitles.length).keys()].map(
    (idx) => {
      const assetTitle = allAssetTitles[idx];
      const decimal = allDecimals[assetTitle];

      // 공급된 토큰의 개수
      const totalSupplied = BN(
        unwrap(reserveData, idx, 0) as bigint,
      )?.dividedBy(decimal);

      const liquidityRate = unwrap(reserveData, idx, 4) as bigint;
      const apy =
        liquidityRate !== undefined ? calcAPY(liquidityRate) : undefined;

      const ltv = BN(
        unwrap(reserveConfigurationData, idx, 0) as bigint,
      )?.dividedBy(100);
      const available = BN(
        balance && (balance[idx].result as number | undefined),
      )
        ?.dividedBy(decimal)
        .dividedBy(WEI);

      const supplied = BN(unwrap(userReserveData, idx, 0))?.dividedBy(decimal);

      return { assetTitle, totalSupplied, apy, ltv, available, supplied };
    },
  );

  const invalidate = () => {
    client.invalidateQueries({ queryKey: q1 });
    client.invalidateQueries({ queryKey: q2 });
    client.invalidateQueries({ queryKey: q3 });
    client.invalidateQueries({ queryKey: q4 });
  };

  return { data, invalidate };
};

// TODO: Link liquidity가 좀 다름
const useBorrowTableDev = () => {
  const { data: reserveData, queryKey: q2 } = useReserveDatas();
  const { data: reserveConfigurationData, queryKey: q3 } =
    useReserveConfigurationDatas();
  const { data: userReserveData, queryKey: q4 } = useUserReserveDatas();
  const { data: assetPrice, queryKey: q5 } = useAssetPrices();
  const client = useQueryClient();

  const data: BorrowRowData[] = [...Array(allAssetTitles.length).keys()].map(
    (idx) => {
      const assetTitle = allAssetTitles[idx];
      const decimal = allDecimals[assetTitle];

      // 내가 빌린 양이 아님에 주의
      const totalBorrowed = BN(
        unwrap(reserveData, idx, 3) as bigint,
      )?.dividedBy(decimal);

      const variableBorrowRate = unwrap(reserveData, idx, 5) as bigint;
      const apy =
        variableBorrowRate !== undefined
          ? calcAPY(variableBorrowRate)
          : undefined;

      // liquidity: 시장 내에서 빌려갈 수 있는 양 (total supply - total borrow)
      const price = BN(assetPrice && assetPrice[idx].result)?.dividedBy(
        10 ** 8,
      );
      const totalSupplied = BN(
        unwrap(reserveData, idx, 0) as bigint,
      )?.dividedBy(decimal);
      const liquidity =
        totalSupplied &&
        totalBorrowed &&
        price &&
        totalSupplied.minus(totalBorrowed).multipliedBy(price);

      const status = BN(unwrap(userReserveData, idx, 2))?.dividedBy(decimal);

      const ltv = BN(
        unwrap(reserveConfigurationData, idx, 0) as bigint,
      )?.dividedBy(100);

      return { assetTitle, totalBorrowed, apy, liquidity, status, ltv };
    },
  );

  const invalidate = () => {
    client.invalidateQueries({ queryKey: q2 });
    client.invalidateQueries({ queryKey: q3 });
    client.invalidateQueries({ queryKey: q4 });
    client.invalidateQueries({ queryKey: q5 });
  };

  return { data, invalidate };
};