import { useEffect, useState } from "react";
import Account from "./Account";
import Table from "./Table";
import {
  AAVEBorrowAmount,
  DAIBorrowAmount,
  EURSBorrowAmount,
  LINKBorrowAmount,
  USDCBorrowAmount,
  USDTBorrowAmount,
  WBTCBorrowAmount,
  WETHBorrowAmount,
} from "@/apis/borrowAmount";

interface Props {
  account: string;
}
export default function Borrow({ account }: Props) {
  const [balance, setBalance] = useState(0);
  const tableCol = [
    ["ETH.png", "DAI", 0, 0, 0],
    ["ETH.png", "USDT", 0, 0, 0],
    ["usdc.png", "USDC", 0, 0, 0],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
  ];
  useEffect(() => {
    if (account) {
      checkMyBorrow(account);
    }
  }, []);

  const checkMyBorrow = async (account: string) => {
    const dai = await DAIBorrowAmount(account);
    const usdt = await USDTBorrowAmount(account);
    const usdc = await USDCBorrowAmount(account);
    const wbtc = await WBTCBorrowAmount(account);
    const link = await LINKBorrowAmount(account);
    const aave = await AAVEBorrowAmount(account);
    const eurs = await EURSBorrowAmount(account);
    const weth = await WETHBorrowAmount(account);

    const result =
      parseFloat(dai) +
      parseFloat(usdt) +
      parseFloat(usdc) +
      parseFloat(wbtc) +
      parseFloat(link) +
      parseFloat(aave) +
      parseFloat(eurs) +
      parseFloat(weth);

    setBalance(result);
  };
  return (
    <div className="overflow-hidden rounded-lg w-full max-w-lg">
      <div className="bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-4 pt-5 pb-7">
        <div className="flex justify-between ">
          <div className="font-montserrat text-[18px] leading-[20px] text-[#CDD9C9]">
            Borrow
          </div>
          <div className="font-pretendard text-[18px] leading-[20px] text-[#B0B0B0]">
            Balance : ${balance}
          </div>
        </div>
      </div>
      <Account>
        <Table tableCol={tableCol} />
      </Account>
    </div>
  );
}
