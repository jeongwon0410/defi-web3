import { name } from "@/apis/common";
import {
  AAVEBalance,
  DAIBalance,
  EURSBalance,
  LINKBalance,
  USDCBalance,
  USDTBalance,
  WBTCBalance,
  WETHBalance,
} from "@/apis/balance";
import {
  AAVEMySupplyBalance,
  DAIMySupplyBalance,
  EURSMySupplyBalance,
  LINKMySupplyBalance,
  USDCMySupplyBalance,
  USDTMySupplyBalance,
  WBTCMySupplyBalance,
  WETHMySupplyBalance,
} from "@/apis/mySupplyBalance";
import { useEffect, useState } from "react";
interface Props {
  tableCol: string[][];
  setOpenSupply: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  allMarket: boolean;
  setCryptoImg: React.Dispatch<React.SetStateAction<string>>;
  setCryptoName: React.Dispatch<React.SetStateAction<string>>;
  setMySupply: React.Dispatch<React.SetStateAction<string>>;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  account: string;
}

export default function SupplyTableData({
  tableCol,
  setOpenSupply,
  setOpenWithdraw,
  allMarket,
  setCryptoImg,
  setCryptoName,
  setMySupply,
  setBalance,
  account,
}: Props) {
  const handleSupplyClick = (index: number) => {
    if (account) {
      setCryptoName(tableCol[index][1]);
      setCryptoImg(tableCol[index][0]);
      setOpenSupply(true);
      checkSupply(tableCol[index][1], account);
      checkBalance(tableCol[index][1], account);
    }
  };

  const handleWithdrawClick = (index: number) => {
    if (account) {
      setCryptoName(tableCol[index][1]);
      setCryptoImg(tableCol[index][0]);
      setOpenWithdraw(true);
      checkSupply(tableCol[index][1], account);
    }
  };

  const checkSupply = async (cryptoName: string, account: string) => {
    if (cryptoName === name[0]) {
      DAIMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[1]) {
      USDTMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    } else {
      WETHMySupplyBalance(account).then((item) => setMySupply(item ?? "0"));
    }
  };

  const checkBalance = async (cryptoName: string, account: string) => {
    if (cryptoName === name[0]) {
      DAIBalance(account).then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[1]) {
      USDTBalance(account).then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCBalance(account).then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCBalance(account).then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKBalance(account).then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEBalance(account).then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSBalance(account).then((item) => setBalance(item ?? "0"));
    } else {
      WETHBalance(account).then((item) => setBalance(item ?? "0"));
    }
  };
  return (
    <>
      {tableCol &&
        tableCol.map((col: string[], index: number) =>
          !allMarket && index > 3 ? null : (
            <tr key={index} className="h-[74px] column">
              <td>
                <div className="flex justify-center ">
                  <img src={col[0]} className="h-[28px] w-[28px] mr-3" />
                  <div className="font-pretendard font-semibold text-[14px] leading-[20px] text-[#B0B0B0] mt-1 ">
                    {col[1]}
                  </div>
                </div>
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[2]}
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[3]}
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[4]}
              </td>
              <td>
                <div className=" bg-[#252423] h-[20px] w-[2px]" />
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#3E4064] w-[350px]">
                <div className="flex justify-center">
                  <button
                    className="items-center py-2 px-8 rounded-lg  bg-[#2F8128] mr-4 text-[#E1E3EA] "
                    onClick={() => handleSupplyClick(index)}
                  >
                    Supply
                  </button>
                  <button
                    className="items-center py-2 px-5 rounded-lg bg-[#262626] text-[#818A80]"
                    onClick={() => handleWithdrawClick(index)}
                  >
                    Withdraw
                  </button>
                </div>
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[5]}
              </td>
            </tr>
          )
        )}
    </>
  );
}
