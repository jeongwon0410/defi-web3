"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";
import BorrowTable from "@/app/(header)/bank/BorrowTable";
import SupplyTable from "@/app/(header)/bank/SupplyTable";
import Switch from "@/app/(header)/bank/Switch";

export type Tab = "supply" | "borrow";

export default function Main() {
  const [tab, setTab] = useState<Tab>("supply");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col justify-center px-5 py-20">
      <Switch tab={tab} setTab={setTab} setExpanded={setExpanded} />

      <div className="mx-auto mt-10 flex">
        {tab === "supply" ? (
          <SupplyTable expanded={expanded} />
        ) : (
          <BorrowTable expanded={expanded} />
        )}
      </div>

      <AllMarketButton
        expanded={expanded}
        toggle={() => setExpanded((x) => !x)}
      />

      <InfoLabel>
        If I supply $## DAI, I can make a interest ##% a year
      </InfoLabel>
    </div>
  );
}

const AllMarketButton = ({
  expanded,
  toggle,
}: {
  expanded: boolean;
  toggle: () => void;
}) => {
  return (
    <button
      className="mt-5 flex flex-col items-center hover:opacity-50"
      onClick={toggle}
    >
      <div className="flex items-center">
        <Image src="/bank/add.svg" width={16} height={16} alt="" />
        <div className=" text-[0.8rem] font-semibold text-[#525C52]">
          {expanded ? "Shrink" : "All market"}
        </div>
      </div>
      <div className="mt-1 h-[1px] w-[99px] bg-[#525C52]" />
    </button>
  );
};

const InfoLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-[3.25rem] flex flex-col items-center gap-[0.62rem]">
      <div className="flex items-center gap-2">
        <Image
          src="/bank/line.svg"
          width={200}
          height={32}
          alt=""
          className="rotate-180"
        />
        <Image src="/bank/person.svg" width={32} height={32} alt="" />
        <Image src="/bank/line.svg" width={200} height={32} alt="" />
      </div>
      <div className="text-[0.875rem] font-medium text-[#95A190]">
        {children}
      </div>
    </div>
  );
};
