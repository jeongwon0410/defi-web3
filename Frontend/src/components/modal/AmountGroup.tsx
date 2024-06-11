import { ReactNode, useState } from "react";
import BigNumber from "bignumber.js";
import GroupBg from "./GroupBg";
import { AssetTitle } from "@/contracts/assets";
import { useAssetPrice } from "@/contracts/dev/helper";
import { numberWithCommas } from "@/util/format";

type Props = {
  assetTitle: AssetTitle;
  amount: BigNumber;
  setAmount: (value: BigNumber) => void;
  maxAmount: BigNumber | undefined;
};

export default function AmountGroup({
  assetTitle,
  amount,
  setAmount,
  maxAmount,
}: Props) {
  const price = useAssetPrice(assetTitle);
  const [text, _setText] = useState("");

  const setText = (text: string) => {
    const bn = BigNumber(text.replaceAll(",", ""));
    if (bn.isNaN()) {
      _setText(text);
      return;
    }

    if (maxAmount && maxAmount.lt(bn)) {
      _setText(numberWithCommas(maxAmount.toNumber()));
      setAmount(maxAmount);
      return;
    }

    _setText(text);
    setAmount(bn);
  };

  const _amount = BigNumber(amount);
  const value =
    price && _amount.isNaN() === false
      ? BigNumber(amount).multipliedBy(price)
      : undefined;

  return (
    <GroupBg className="relative flex h-[7.375rem] w-full justify-between gap-[0.38rem] border-[0.63px] border-[#49824F] shadow-[0_0_17.73px_0_rgba(129,189,124,0.14)]">
      <GradientText className="absolute left-[1.13rem] top-[0.88rem] text-[1.25rem] font-bold">
        Amount
      </GradientText>
      <div className="absolute left-[1.13rem] right-[1.13rem] top-[2.81rem] flex flex-col items-end overflow-hidden">
        <Input text={text} setText={setText} />
        <GradientText className="text-[0.6875rem] font-normal leading-[0.9375rem]">
          ${value?.toFormat(2) ?? 0}
        </GradientText>
      </div>
      <button
        className="absolute bottom-[0.87rem] right-[1.13rem] text-[0.6875rem] font-normal text-neutral-300 underline"
        onClick={() => {
          if (maxAmount) {
            setAmount(maxAmount);
            setText(numberWithCommas(maxAmount.toNumber()));
          }
        }}
      >
        Max
      </button>
    </GroupBg>
  );
}

const Input = ({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) => {
  return (
    <input
      className={`w-full bg-transparent text-right text-[1.25rem] font-bold leading-[1.5625rem] text-[rgba(110,197,104,1)] caret-slate-50 outline-none`}
      placeholder="0"
      value={text}
      onChange={(e) => {
        const value = e.target.value;
        const replaced = value.replace(/[^0-9.]/g, "");

        const dotCnt = [...replaced].filter((x) => x === ".").length;
        if (1 < dotCnt) return;

        if (value[value.length - 1] === ".") {
          setText(value);
          return;
        }

        if (replaced.includes(".") && replaced[replaced.length - 1] === "0") {
          if (2 < replaced.split(".")[1].length) return;
          setText(value);
        } else {
          const ceiled = Math.floor(Number(replaced) * 100) / 100;
          setText(numberWithCommas(ceiled));
        }
      }}
    />
  );
};

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
