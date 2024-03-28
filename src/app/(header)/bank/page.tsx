"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import BorrowTable from "@/components/main/borrow/BorrowTable";
import SupplyTable from "@/components/main/supply/SupplyTable";
import Switch from "@/app/(header)/bank/Switch";

export type Tab = "supply" | "borrow";

export default function Main() {
  const [tab, setTab] = useState<Tab>("supply");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className=" mt-20 flex flex-col justify-center px-5">
      <Switch tab={tab} setTab={setTab} setAllMarket={setExpanded} />

      <div className="mt-10 flex">
        {tab === "supply" ? (
          <SupplyTable expanded={expanded} />
        ) : (
          <BorrowTable expanded={expanded} />
        )}
      </div>

      <AllMarketButton onClick={() => setExpanded((x) => !x)} />

      <InfoLabel>나는 몇개 예치하고 1년에 약 00 이자를 받을 수 있다</InfoLabel>
    </div>
  );
}

const AllMarketButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="mt-5 flex flex-col items-center justify-center"
      onClick={onClick}
    >
      <div className="flex items-center justify-center ">
        <Image src="/all_img.png" width={16} height={16} alt="" />
        <div className=" text-[14px] font-normal leading-[20px] text-[#525C52]">
          All market
        </div>
      </div>
      <div className=" mt-1 h-[1px] w-[99px] bg-[#525C52]" />
    </button>
  );
};

const InfoLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex  flex-col items-center justify-center py-10">
      <Image src="/person.png" width={500} height={50} alt="" />
      <div className="text-white">{children}</div>
    </div>
  );
};
