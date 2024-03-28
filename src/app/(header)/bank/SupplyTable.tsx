import { useEffect } from "react";
import { useImmer } from "use-immer";
import BigNumber from "bignumber.js";
import TableHeader from "./TableHeader";
import SupplyTableContent from "./SupplyTableContent";

import { useTmpContext } from "@/components/TmpContext";

import { allAssetTitles } from "@/constants/assets";
import {
  getSupplyTotal,
  getSupplyAPY,
  getMaxLTV,
  getBalance,
  getMySupplyBalance,
} from "@/apis";

export type SupplyTableCol = {
  imageURL: string;
  title: string;
  totalSupplied: BigNumber;
  apy: BigNumber;
  ltv: BigNumber;
  balance: BigNumber;
  supply: BigNumber;
};

export default function SupplyTable({ expanded }: { expanded: boolean }) {
  const { address: account } = useTmpContext();
  const [cols, setCols] = useImmer<SupplyTableCol[]>([]);

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
    <div className="w-full ">
      <table className="table w-full px-20 text-center">
        <TableHeader rows={rows} />
        <SupplyTableContent cols={cols} expanded={expanded} />
      </table>

      {/* {modal === "supply" && (
        <Modal
          setOpen={setOpenSupply}
          item={supply}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={max}
          account={account}
        />
      )}

      {modal === "withdraw" && (
        <Modal
          setOpen={setOpenWithdraw}
          item={withdraw}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={mySupply}
          account={account}
        />
      )} */}
    </div>
  );
}

const fetchCols = async (account: string): Promise<SupplyTableCol[]> => {
  const promises = allAssetTitles.map(async (title) => ({
    // TODO: title -> imageURL
    imageURL: "/ETH.png",
    title,
    totalSupplied: await getSupplyTotal(title),
    apy: await getSupplyAPY(title),
    ltv: await getMaxLTV(title),
    balance: await getBalance(title, account),
    supply: await getMySupplyBalance(title, account),
  }));

  return await Promise.all(promises);
};

const rows = [
  "Asset",
  "Total Supplied",
  "APY/LTV",
  "Available",
  "",
  "Supply&Withdraw",
  "Supplied",
];

// const supply = {
//   name: "Supply",
//   content: [
//     { name: "Wallet Balance", ratio: balance },
//     { name: "Amount Supplied", ratio: mySupply },
//     { name: "APY", ratio: apy },
//     { name: "Max LTV", ratio: maxLTV },
//   ],
// };

// const withdraw = {
//   name: "Withdraw",
//   content: [
//     { name: "My Supply", ratio: mySupply },
//     { name: "APY", ratio: apy },
//   ],
// };
