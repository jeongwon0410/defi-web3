import Exclude from "/public/exclude.svg";
import GroupBg from "./GroupBg";
import { ReactNode } from "react";
import BigNumber from "bignumber.js";

type Props = {
  ltv: BigNumber;
  amount: BigNumber;
  dollar: BigNumber;
  maxAmount: BigNumber;

  setAmount: (value: BigNumber) => void;
};

export default function AmountGroup({
  ltv,
  amount,
  dollar,
  maxAmount,
  setAmount,
}: Props) {
  return (
    <div className="flex h-[7.375rem] justify-between gap-[0.38rem]">
      <GroupBg className="relative w-[9.875rem]">
        <p className="absolute left-[1.13rem] top-[0.94rem] text-[0.875rem] font-semibold text-white">
          LTV
        </p>
        <p className="absolute bottom-[2rem] right-[1.13rem] overflow-hidden text-[0.875rem] font-semibold text-white">
          {ltv.toString()}
        </p>
      </GroupBg>

      <div className="my-auto">
        <Exclude />
      </div>

      <GroupBg className="relative w-[15.3125rem]">
        <GradientText className="absolute left-[1.13rem] top-[0.88rem] text-[1.25rem] font-bold">
          Amount
        </GradientText>
        <div className="absolute right-[1.13rem] top-[2.81rem] flex flex-col items-end">
          <input
            type="number"
            className={`inline-block w-[90%] bg-gradient-to-r from-[rgba(86,117,84,1)] to-[rgba(110,197,104,1)] bg-clip-text text-right text-[1.25rem] font-bold leading-[1.5625rem] text-transparent caret-slate-50 outline-none`}
            value={amount.toString()}
            onChange={(e) =>
              setAmount(BigNumber(e.target.value === "" ? 0 : e.target.value))
            }
          />
          <GradientText className="text-[0.6875rem] font-normal leading-[0.9375rem]">
            {dollar.toString()}
          </GradientText>
        </div>
        <button
          className="absolute bottom-[0.87rem] right-[1.13rem] text-[0.6875rem] font-normal text-white underline"
          onClick={() => setAmount(maxAmount)}
        >
          Max: Available balance
        </button>
      </GroupBg>
    </div>
  );
}

const GradientText = ({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) => (
  <p
    className={`inline-block bg-gradient-to-r from-[rgba(86,117,84,1)] to-[rgba(110,197,104,1)] bg-clip-text text-transparent ${className}`}
  >
    {children}
  </p>
);
