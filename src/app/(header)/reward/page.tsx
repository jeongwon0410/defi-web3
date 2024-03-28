"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Table from "@/app/(header)/reward/Table";

export default function RewardMain() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center ">
      <div className="text-[30px] font-bold leading-[45px] text-[white]">
        Reward
      </div>

      <div className="mt-5 flex w-full items-center justify-center gap-10">
        <Block
          height={132}
          width={640}
          title="Total Points"
          content="00.00"
          tooltip="Points refresh every 24 hours"
        />
        <Block height={132} width={300} title="Global Rank" content="#00.00" />
      </div>

      <div className="mt-5 flex w-full justify-center gap-6">
        <Block
          height={132}
          width={200}
          title="Supply Points"
          content="00.00"
          tooltip="Supply earns 1 point per dollar deposit per day"
        />
        <Block
          height={132}
          width={200}
          title="Borrowing Points"
          content="00.00"
          tooltip="Borrowing earns 4 points per dollar borrowed per day"
        />

        <Block
          height={132}
          width={200}
          title="Referral Points"
          content="00.00"
          tooltip="Earn 10% of the points any user you refer earns"
        />

        <div className="ml-5 flex flex-col gap-5">
          <LinkBlock>How do points works?</LinkBlock>
          <LinkBlock>Copy referral link</LinkBlock>
        </div>
      </div>

      <div className="mt-10 w-9/12">
        <Table />
      </div>
    </div>
  );
}

const Block = ({
  title,
  content,
  width,
  height,
  tooltip,
}: {
  title: string;
  content: string;
  width: number;
  height: number;
  tooltip?: string;
}) => (
  <div
    className="flex flex-col justify-center rounded-[20px] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%]  p-6"
    style={{ height, width }}
  >
    <div className="flex items-center gap-1">
      <div className="font-montserrat text-[15px] leading-[20px] text-[#CDD9C9]">
        {title}
      </div>
      {tooltip && (
        <div className="tooltip  tooltip-right" data-tip={tooltip}>
          <Image src="/ol-details-so.png" height={14} width={14} alt="" />
        </div>
      )}
    </div>
    <div className="mt-2 font-montserrat text-[30px] leading-[20px] text-white ">
      {content}
    </div>
  </div>
);

const LinkBlock = ({ children }: { children: ReactNode }) => (
  <div className="flex h-[58px] w-[300px] flex-col items-center justify-center rounded-full bg-[#4A4A4A] p-6">
    <div className="font-montserrat text-[17px] leading-[20px] text-white">
      {children}
    </div>
  </div>
);
