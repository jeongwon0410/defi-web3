import { useMutation, useQuery } from "react-query";
import Table from "./Table";
import getAddress from "@/apis/getAddress";
import saveAddress from "@/apis/saveAddress";
import { useEffect } from "react";

export default function RewardMain() {
  return (
    <div className=" justify-center  items-center flex  flex-col mt-20 ">
      <div className="font-montserrat  font-bold text-[30px] leading-[45px] text-[white]">
        Reward
      </div>
      <div className="flex justify-center  items-center w-full gap-10 mt-5">
        <div className="p-6 rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] flex flex-col w-[640px] h-[132px]  justify-center  ">
          <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
            Total Points
          </div>
          <div className="font-montserrat text-[30px] leading-[20px] text-white mt-2 ">
            00.00
          </div>
        </div>
        <div className="p-6 rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] flex flex-col w-[300px] h-[132px]  justify-center ">
          <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
            Global Rank
          </div>
          <div className="font-montserrat text-[30px] leading-[20px] text-white mt-2">
            #00,00
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full gap-6 mt-5">
        <div className="p-6 rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] flex flex-col w-[200px] h-[132px]  justify-center ">
          <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
            Supply Points
          </div>
          <div className="font-montserrat text-[24px] leading-[20px] text-white mt-2">
            00.00
          </div>
        </div>
        <div className="p-6 rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] flex flex-col w-[200px] h-[132px]  justify-center ">
          <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
            Borrowing Points
          </div>
          <div className="font-montserrat text-[30px] leading-[20px] text-white mt-2">
            00.00
          </div>
        </div>
        <div className="p-6 rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] flex flex-col w-[200px] h-[132px]  justify-center ">
          <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
            Referral Points
          </div>
          <div className="font-montserrat text-[30px] leading-[20px] text-white mt-2">
            00.00
          </div>
        </div>
        <div className="flex flex-col gap-5 ml-5">
          <div className="p-6 rounded-full flex flex-col bg-[#4A4A4A] h-[58px] w-[300px] justify-center items-center">
            <div className="font-montserrat text-[17px] leading-[20px] text-white">
              How do points works?
            </div>
          </div>
          <div className="p-6 rounded-full flex flex-col bg-[#4A4A4A] h-[58px] w-[300px] justify-center items-center">
            <div className="font-montserrat text-[17px] leading-[20px] text-white">
              Copy referral link
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-9/12">
        <Table />
      </div>
    </div>
  );
}
