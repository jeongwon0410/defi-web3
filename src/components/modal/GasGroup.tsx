import BigNumber from "bignumber.js";
import Gas from "/public/gas.svg";
import { formatGas } from "@/util/format";

export default function GasGroup({ value }: { value?: BigNumber }) {
  return (
    <div className="flex items-center gap-[0.3rem] text-[#535353]">
      <Gas />
      <p className="text-[1rem] font-medium">$ {formatGas(value)}</p>
    </div>
  );
}
