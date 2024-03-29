import BigNumber from "bignumber.js";
import GroupBg from "./GroupBg";

export default function HealthFactorGroup({ value }: { value: BigNumber }) {
  return (
    <GroupBg className="px-[1.12rem] py-[0.94rem]">
      <div className="flex justify-between text-[0.875rem] font-semibold">
        <p className="text-[#B0B0B0]">Health Factor</p>
        <p className="text-[#818A80]">{value.toString()}</p>
      </div>
    </GroupBg>
  );
}
