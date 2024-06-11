"use client";

import Image from "next/image";
import { Label } from "./Table";
import { titleToIcon } from "@/contracts/assets";
import { formatTwoDecimal } from "@/util/format";
import { MyBorrowRowData, MySupplyRowData } from "@/contracts/type";

export const BorrowTr = ({ data }: { data: MyBorrowRowData }) => {
  return (
    <div className="flex h-16 items-center justify-around rounded-[0.7875rem] bg-[#1B1C1B]">
      <ImageLabel src={titleToIcon[data.assetTitle]} title={data.assetTitle} />
      <Label>{formatTwoDecimal(data.debt)}</Label>
      <Label>{formatTwoDecimal(data.apy)}%</Label>
      <Label>{formatTwoDecimal(data.ltv)}%</Label>
      <Label>{formatTwoDecimal(data.liquidation)}%</Label>
    </div>
  );
};

export const SupplyTr = ({ data }: { data: MySupplyRowData }) => {
  return (
    <div className="flex h-16 items-center justify-around rounded-[0.7875rem] bg-[#1B1C1B]">
      <ImageLabel src={titleToIcon[data.assetTitle]} title={data.assetTitle} />
      <Label>{formatTwoDecimal(data.balance)}</Label>
      <Label>{formatTwoDecimal(data.apy)}%</Label>
      <Label>{formatTwoDecimal(data.ltv)}%</Label>
    </div>
  );
};

const ImageLabel = ({ src, title }: { src: string; title: string }) => (
  <Label>
    <div className="flex items-center justify-center gap-1">
      <Image
        src={src}
        alt=""
        width={24}
        height={24}
        className="h-[24px] w-[24px]"
      />
      {title}
    </div>
  </Label>
);
