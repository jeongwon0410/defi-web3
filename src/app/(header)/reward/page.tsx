"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";
import Table from "@/app/(header)/reward/Table";

export default function RewardMain() {
  return (
    <div className="mx-auto flex w-[80vw] max-w-[960px] flex-col items-center">
      <div className="font-montserrat text-[30px] font-bold text-[white]">
        Reward
      </div>

      <div className="mt-[4.5rem] grid grid-cols-4 gap-x-4 gap-y-6">
        <Block
          title="Total Points"
          content="00.00"
          tooltip="Points refresh every 24 hours"
          className="col-span-3"
        />
        <Block title="Global Rank" content="#00.00" />
        <Block
          title="Supply Points"
          content="00.00"
          tooltip="Supply earns 1 point per dollar deposit per day"
        />
        <Block
          title="Borrowing Points"
          content="00.00"
          tooltip="Borrowing earns 4 points per dollar borrowed per day"
        />
        <Block
          title="Referral Points"
          content="00.00"
          tooltip="Earn 10% of the points any user you refer earns"
        />
        <div className="flex flex-1 flex-col justify-between">
          <LinkBlock>How do points works?</LinkBlock>
          <LinkBlock>Copy referral link</LinkBlock>
        </div>
      </div>

      <Table />
    </div>
  );
}

const Block = ({
  title,
  content,
  tooltip,
  className,
}: {
  title: string;
  content: string;
  tooltip?: string;
  className?: string;
}) => (
  <div
    className={`flex flex-col rounded-[20px] bg-[linear-gradient(98deg,rgba(131,173,130,0.28)_3.4%,rgba(255,255,255,0.00)_51.09%,rgba(131,173,130,0.09)_93.74%)] px-[1.75rem] pb-[2.75rem] pt-[2.25rem] ${className}`}
  >
    <div className="flex items-center gap-[0.37rem]">
      <p className="inline-block whitespace-nowrap bg-gradient-to-r from-[rgba(205,217,201,1)] to-[rgba(180,255,155,1)] bg-clip-text font-montserrat text-[0.9375rem] text-transparent">
        {title}
      </p>
      {tooltip && (
        <Image src="/reward/questionMark.svg" height={14} width={14} alt="" />
      )}
    </div>
    <p className="mt-2 font-montserrat text-[1.875rem] leading-[100%] text-white ">
      {content}
    </p>
  </div>
);

const LinkBlock = ({ children }: { children: ReactNode }) => (
  <Link
    className="flex h-[58px] flex-col items-center justify-center rounded-full bg-[#4A4A4A] p-6"
    href=""
  >
    <div className="font-montserrat text-[1rem] font-medium text-white">
      {children}
    </div>
  </Link>
);
