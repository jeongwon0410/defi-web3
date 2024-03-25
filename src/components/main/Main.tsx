import { useState } from "react";
import SupplyTable from "./supply/SupplyTable";

import Switch from "./Switch";
import BorrowTable from "./borrow/BorrowTable";
import { useTmpContext } from "@/pages/TmpContext";

export default function Main() {
  const { address, setAddress } = useTmpContext();
  const [supply, setSupply] = useState(true);
  const [borrow, setBorrow] = useState(false);
  const [allMarket, setAllMarket] = useState(false);

  return (
    <div className=" px-5 justify-center  flex  flex-col mt-20">
      <Switch
        supply={supply}
        borrow={borrow}
        setSupply={setSupply}
        setBorrow={setBorrow}
        setAllMarket={setAllMarket}
      />
      <div className="flex mt-10">
        {supply === true ? (
          <SupplyTable allMarket={allMarket} account={address!} />
        ) : (
          <BorrowTable allMarket={allMarket} account={address!} />
        )}
      </div>
      <button
        className="flex justify-center items-center flex-col mt-5"
        onClick={() => setAllMarket(!allMarket)}
      >
        <div className="flex justify-center items-center ">
          <img src="all_img.png" className="h-[16px] w-[16px] " />
          <div className="font-pretendard font-normal text-[14px] leading-[20px] text-[#525C52]">
            All market
          </div>
        </div>
        <div className=" bg-[#525C52] h-[1px] w-[99px] mt-1" />
      </button>
      <div className="flex  flex-col justify-center items-center py-10">
        <img src="person.png" className="h-[50px] w-[500px] " />
        <div className="text-white">
          {/* 나는 몇개 예치하고 1년에 약 00 이자를 받을 수 있다 */}
        </div>
      </div>
    </div>
  );
}
