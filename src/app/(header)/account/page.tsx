"use client";

import BigNumber from "bignumber.js";
import { useState, useEffect } from "react";
import Table, { TableProps } from "./Table";
import { TableRow } from "./TableContent";
import { useTmpContext } from "@/components/TmpContext";
import {
  getMySupplyBalance,
  getSupplyAPY,
  getMaxLTV,
  getBorrowAmount,
  getBorrowApy,
  getLiquidation,
} from "@/apis/contract";
import { allAssetTitles } from "@/constants/assets";

const supplyHeader = ["Asset", "Supplied", "APY", "MAXLTV"];
const borrowHeader = ["Asset", "Borrowed", "APY", "MAXLTV", "LIQUIDATION"];

export default function AccountMain() {
  const [supplyContent, setSupplyContent] = useState<TableProps | null>(null);
  const [borrowContent, setBorrowContent] = useState<TableProps | null>(null);

  const { address: account } = useTmpContext();

  useEffect(() => {
    if (account === null) return;
    let flag = true;

    (async () => {
      const supplyContent = await fetchSupplyContent(account);
      const borrowContent = await fetchBorrowContent(account);

      if (!flag) return;

      setSupplyContent({
        ...supplyContent,
        header: supplyHeader,
        title: "Supply",
      });
      setBorrowContent({
        ...borrowContent,
        header: borrowHeader,
        title: "Borrow",
      });
    })();

    return () => {
      flag = false;
    };
  }, [account]);

  if (supplyContent === null || borrowContent === null) return <></>;

  // TODO: 로딩 처리
  return (
    <>
      <Table {...supplyContent} />
      <Table {...borrowContent} />
    </>
  );
}

const fetchSupplyContent = async (account: string) => {
  const balanceList = await Promise.all(
    allAssetTitles.map((title) => getMySupplyBalance(title, account)),
  );

  const balance = balanceList.reduce(
    (prev, cur) => prev.plus(cur),
    BigNumber(0),
  );

  const content: TableRow[] = await Promise.all(
    allAssetTitles.map(async (title) => ({
      imageURL: "",
      title,
      // TODO: 최적화
      content: [
        (await getMySupplyBalance(title, account)).toString(),
        (await getSupplyAPY(title)).toString(),
        (await getMaxLTV(title)).toString(),
      ],
    })),
  );

  return { balance, content };
};

const fetchBorrowContent = async (account: string) => {
  const balanceList = await Promise.all(
    allAssetTitles.map((title) => getBorrowAmount(title, account)),
  );

  const balance = balanceList.reduce(
    (prev, cur) => prev.plus(cur),
    BigNumber(0),
  );

  const content: TableRow[] = await Promise.all(
    allAssetTitles.map(async (title) => ({
      imageURL: "",
      title,
      // TODO: 최적화
      content: [
        (await getMySupplyBalance(title, account)).toString(),
        (await getBorrowApy(title)).toString(),
        (await getMaxLTV(title)).toString(),
        (await getLiquidation(title, account)).toFixed(2) + "%",
      ],
    })),
  );

  return { balance, content };
};
