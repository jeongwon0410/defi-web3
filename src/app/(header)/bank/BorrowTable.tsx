import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import TableHeader from "./TableHeader";
import BorrowTableContent from "./BorrowTableContent";
import { useTmpContext } from "@/components/TmpContext";
import { allAssetTitles } from "@/constants/assets";
import {
  getBalance,
  getBorrowApy,
  getBorrowTotal,
  getMaxLTV,
} from "@/apis/contract";

export type BorrowTableCol = {
  imageURL: string;
  title: string;
  totalBorrow: BigNumber;
  apy: BigNumber;

  balance: BigNumber;
  ltv: BigNumber;
};

export default function BorrowTable({ expanded }: { expanded: boolean }) {
  const { address: account } = useTmpContext();
  const [cols, setCols] = useState<BorrowTableCol[]>([]);

  useEffect(() => {
    if (account === null) return;
    let flag = true;

    fetchCols(account).then((cols) => {
      if (flag) setCols(cols);
    });

    return () => {
      flag = false;
    };
  }, [account, setCols]);

  return (
    <div className="w-full  ">
      <table className="table w-full px-20 text-center">
        <TableHeader rows={rows} />
        <BorrowTableContent cols={cols} expanded={expanded} />
      </table>
    </div>
  );
}

const fetchCols = async (account: string): Promise<BorrowTableCol[]> => {
  const promises = allAssetTitles.map(async (title) => ({
    // TODO: title -> imageURL
    imageURL: "/ETH.png",
    title,
    totalBorrow: await getBorrowTotal(title),
    apy: await getBorrowApy(title),
    balance: await getBalance(title, account),
    ltv: await getMaxLTV(title),
  }));

  return await Promise.all(promises);
};

const rows = [
  "Asset",
  "Total Borrow",
  "Borrow APY",
  "",
  "Borrow&Repay",
  "My Status/LTV",
];

// const borrow = {
//   name: "Borrow",
//   content: [
//     { name: "Wallet Balance", ratio: balance },
//     { name: "Borrowable Amount", ratio: borrowableAmount },
//     { name: "APY", ratio: apy },
//   ],
// };

// const repay = {
//   name: "Repay",
//   content: [
//     { name: "My debt(Borrowed Amount)", ratio: borrowAmount },
//     { name: "APY", ratio: apy },
//   ],
// };
