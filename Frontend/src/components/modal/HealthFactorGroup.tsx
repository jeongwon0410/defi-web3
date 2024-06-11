import BigNumber from "bignumber.js";
import GroupBg from "./GroupBg";
import { formatTwoDecimal } from "@/util/format";
import { AssetTitle } from "@/contracts/assets";
import { useHealthFactor } from "@/contracts";

export default function HealthFactorGroup({
  type,
  amount,
  title,
}: {
  type: "borrow" | "repay";
  amount: BigNumber;
  title: AssetTitle;
}) {
  const healthFactor = useHealthFactor(type, amount, title);

  return (
    <GroupBg className="px-[1.12rem] py-[0.94rem]">
      <div className="flex justify-between text-[0.875rem] font-semibold">
        <p className="text-[#B0B0B0]">Health Factor</p>
        <p className="text-[#818A80]">
          {formatTwoDecimal(amount.isEqualTo(0) ? undefined : healthFactor)}
        </p>
      </div>
    </GroupBg>
  );
}
