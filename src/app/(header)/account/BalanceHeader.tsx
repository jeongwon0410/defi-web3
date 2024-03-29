import BigNumber from "bignumber.js";

export default function BalanceHeader({
  title,
  balance,
}: {
  title: string;
  balance: BigNumber;
}) {
  return (
    <div className="relative top-1 flex justify-between rounded-t-[0.8rem] bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-[3.37rem] pb-[1.4rem] pt-[1.8rem]">
      <h3 className="inline-block bg-gradient-to-r from-[rgba(205,217,201,1)] to-[rgba(180,255,155,1)] bg-clip-text font-montserrat text-[1rem] font-semibold text-transparent">
        {title}
      </h3>
      <p className="text-[1rem] font-medium text-[#B0B0B0]">
        Balance : $ {balance.toString()}
      </p>
    </div>
  );
}
