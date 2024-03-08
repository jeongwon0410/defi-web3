import { useState } from "react";
import SupplyTable from "./SupplyTable";

import Switch from "./Switch";
import BorrowTable from "./BorrowTable";

const tableSupplyRow = [
  "Asset",
  "Total Supplied",
  "APY/LTV",
  "Avaiable",
  "",
  "Supply&Withdraw",
  "Supplied",
];
const tableSupplyCol = [
  ["USDC", "0.000", "0.00%", "0.00%", "00.00"],
  ["USDT", "0.000", "0.00%", "0.00%", "00.00"],
];
const tableSupplyButton = ["Supply", "Withdraw"];

const tableBorrowRow = [
  "Asset",
  "Total Borrow",
  "Borrow APY",
  "",
  "Borrow&Repay",
  "My Status/LTV",
];
const tableBorrowCol = [
  ["USDC", "0.000", "0.00%", "0.00%", "0.00%"],
  ["USDC", "0.000", "0.00%", "0.00%", "0.00%"],
];
const tableBorrowButton = ["Borrow", "Repay"];
export default function Main() {
  const [supply, setSupply] = useState(true);
  const [borrow, setBorrow] = useState(false);
  return (
    <div className=" px-5 justify-center  flex  flex-col">
      <Switch
        supply={supply}
        borrow={borrow}
        setSupply={setSupply}
        setBorrow={setBorrow}
      />
      <div className="flex mt-10">
        {supply === true ? (
          <SupplyTable tableRow={tableSupplyRow} tableCol={tableSupplyCol} />
        ) : (
          <BorrowTable tableRow={tableBorrowRow} tableCol={tableBorrowCol} />
        )}
      </div>
      <button className="flex justify-center items-center flex-col mt-5">
        <div className="flex justify-center items-center ">
          <img src="all_img.png" className="h-[16px] w-[16px] " />
          <div className="font-pretendard font-normal text-[14px] leading-[20px] text-[#525C52]">
            All market
          </div>
        </div>
        <div className=" bg-[#525C52] h-[1px] w-[99px] mt-1" />
      </button>
      <div className="flex  flex-col justify-center items-center mt-20">
        <img src="person.png" className="h-[50px] w-[500px] " />
        <div className="text-white">
          나는 몇개 예치하고 1년에 약 00 이자를 받을 수 있다
        </div>
      </div>
    </div>
  );
}
