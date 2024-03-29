import { IconTd, Td, Divider, Button } from "./Table";
import { normalize } from "@/util/bignumber";
import { AssetTitle } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";
import { RAY_DECIMALS } from "@/constants/common";

export default function SupplyTableRow({
  assetTitle,
  onSupply,
  onWithdraw,
}: {
  assetTitle: AssetTitle;
  onSupply: () => void;
  onWithdraw: () => void;
}) {
  const { data: totalSupplied } = useContract("SUPPLYTOTAL", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);
  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: supply } = usePrivateContract("SUPPLYBALANCE", assetTitle);

  const formattedApy = apy
    ? (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%"
    : "-";

  const formattedLtv = ltv
    ? parseFloat(ltv.dividedBy(100).toString()).toFixed(2) + "%"
    : "-";

  const formattedBalance =
    "$" +
    (balance
      ? balance
          .toFixed(2)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : "-");

  const formattedSupply = supply?.toFixed(18) ?? "-";

  return (
    <tr className="h-[74px]">
      <IconTd src={""}>{assetTitle}</IconTd>

      <Td>{totalSupplied?.toString() ?? "-"}</Td>
      <Td>{`${formattedApy}/${formattedLtv}`}</Td>
      <Td>{formattedBalance}</Td>

      <Divider />

      <td className="w-[350px] text-[14px] font-normal leading-[24px]">
        <div className="flex justify-center gap-4">
          <Button className="bg-[#2F8128] text-[#E1E3EA]" onClick={onSupply}>
            Supply
          </Button>
          <Button className="bg-[#262626] text-[#818A80]" onClick={onWithdraw}>
            Withdraw
          </Button>
        </div>
      </td>

      <Td>{formattedSupply}</Td>
    </tr>
  );
}