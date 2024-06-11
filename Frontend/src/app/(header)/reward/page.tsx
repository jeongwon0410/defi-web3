"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { useRewardPage } from "./hook";
import Table from "@/app/(header)/reward/Table";

export default function RewardMain() {
  const { data, copy } = useRewardPage();

  return (
    <div className="mx-auto flex w-[60rem] flex-col items-center">
      <div className="font-montserrat text-[30px] font-bold text-[white]">
        Reward
      </div>

      <div className="mt-[4.5rem] grid w-full grid-cols-4 gap-x-4 gap-y-6">
        <Block
          title="Total Points"
          content={data?.total.toString() ?? "-"}
          tooltip="Points refresh every 24 hours"
          className="col-span-3"
        />
        <Block title="Global Rank" content={data?.rank.toString() ?? "-"} />
        <Block
          title="Supply Points"
          content={data?.deposit.toString() ?? "-"}
          tooltip="Supply earns 1 point per dollar deposit per day"
        />
        <Block
          title="Borrowing Points"
          content={data?.borrow.toString() ?? "-"}
          tooltip="Borrowing earns 4 points per dollar borrowed per day"
        />
        <Block
          title="Referral Points"
          content={data?.referral.toString() ?? "-"}
          tooltip="Earn 10% of the points any user you refer earns"
        />
        <div className="flex flex-1 flex-col justify-between">
          {/* TODO: 아래 링크 채우기 */}
          {/* <LinkBlock>How do points works?</LinkBlock> */}
          <GrayBlock onClick={copy}>Copy referral link</GrayBlock>
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
        <div className="has-tooltip relative">
          <Image
            src="/reward/questionMark.svg"
            height={14}
            width={14}
            alt=""
            className="h-[14px] w-[14px]"
          ></Image>
          <div className="tooltip left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-nowrap rounded-[0.625rem] bg-[#525C52] p-6 text-white shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]">
            <p className="text-[0.875rem] font-semibold">{title}</p>
            <p className="mt-2 text-[0.875rem] font-normal">{tooltip}</p>
          </div>
          <div className="tooltip left-4 top-1/2 h-0 w-0 -translate-y-1/2 border-b-8 border-r-8 border-t-8 border-b-transparent border-r-[#525C52] border-t-transparent"></div>
        </div>
      )}
    </div>
    <p className="mt-2 font-montserrat text-[1.875rem] leading-[100%] text-white ">
      {content}
    </p>
  </div>
);

const GrayBlock = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    className="flex h-[58px] flex-col items-center justify-center rounded-full bg-[#4A4A4A] p-6"
    onClick={onClick}
  >
    <div className="font-montserrat text-[1rem] font-medium text-white">
      {children}
    </div>
  </button>
);
