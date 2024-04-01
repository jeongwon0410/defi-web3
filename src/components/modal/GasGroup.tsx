import BigNumber from "bignumber.js";
import Gas from "/public/gas.svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GasGroup({ value }: { value: BigNumber }) {
  return (
    <div className="flex items-center gap-[0.3rem] text-[#535353]">
      <Gas />
      <p className="text-[1rem] font-medium">$ -</p>
    </div>
  );
}
