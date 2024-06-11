"use client";

import { ReactNode } from "react";
import { useRewardPageTable } from "./hook";
import { formatAccount } from "@/util/format";

export default function Table() {
  const rankList = useRewardPageTable();
  if (rankList === undefined) return <></>;

  return (
    <div className="mt-[3.75rem] w-full text-center text-[0.9rem] font-normal">
      <div className="flex h-[3.75rem] w-full items-center text-[#6A6A6A]">
        <P>Rank</P>
        <P className="font-bold text-[#B0B0B0]">Address</P>
        <P>Deposit Points</P>
        <P>Borrow Points</P>
        <P>Referral Points</P>
        <P>Total Points</P>
      </div>

      <div className="flex flex-col gap-3">
        {rankList.map((item, idx) => (
          <div
            key={idx}
            className="flex h-[60px] w-full items-center justify-around rounded-[0.875rem] bg-[#1B1C1B] text-center text-[#B0B0B0]"
          >
            <P>{item.rank}</P>
            <P className="font-bold text-[#E1E3EA]">
              {formatAccount(item.address)}
            </P>
            <P>{item.deposit}</P>
            <P>{item.borrow}</P>
            <P>{item.referral}</P>
            <P>{item.total}</P>
          </div>
        ))}
      </div>
    </div>
  );
}

const P = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <p className={`flex-1 ${className} truncate`}>{children}</p>;
