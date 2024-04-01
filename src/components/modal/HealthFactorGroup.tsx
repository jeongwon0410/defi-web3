import GroupBg from "./GroupBg";
import { formatHealthFactor } from "@/util/format";
import { usePrivateContract } from "@/apis/swr";

export default function HealthFactorGroup() {
  const { data: healthFactor } = usePrivateContract("HEALTHFACTOR", "AAVE");

  return (
    <GroupBg className="px-[1.12rem] py-[0.94rem]">
      <div className="flex justify-between text-[0.875rem] font-semibold">
        <p className="text-[#B0B0B0]">Health Factor</p>
        <p className="text-[#818A80]">{formatHealthFactor(healthFactor)}</p>
      </div>
    </GroupBg>
  );
}
