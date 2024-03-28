import BigNumber from "bignumber.js";

export default function TableHeader({
  title,
  balance,
}: {
  title: string;
  balance: BigNumber;
}) {
  return (
    <div className="bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-4 pb-7 pt-5">
      <div className="flex justify-between ">
        <div className="font-montserrat text-[18px] leading-[20px] text-[#CDD9C9]">
          {title}
        </div>
        <div className=" text-[18px] leading-[20px] text-[#B0B0B0]">
          Balance : ${balance.toString()}
        </div>
      </div>
    </div>
  );
}
