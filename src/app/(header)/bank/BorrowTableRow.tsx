import { Button, Divider, IconTd, Td } from "./Table";
import { normalize } from "@/util/bignumber";
import { RAY_DECIMALS } from "@/constants/common";
import { AssetTitle } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";

export default function BorrowTableRow({
  assetTitle,
  onBorrow,
  onRepay,
}: {
  assetTitle: AssetTitle;
  onBorrow: () => void;
  onRepay: () => void;
}) {
  const { data: totalBorrow } = useContract("BORROWTOTAL", assetTitle);
  const { data: apy } = useContract("BORROWAPY", assetTitle);
  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const formattedTotal = totalBorrow
    ? "$" +
      totalBorrow
        .toFixed(2)
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : "-";

  const formattedApy = apy
    ? (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%"
    : "-";

  return (
    <tr className="column h-[74px]">
      <IconTd src={""}>{assetTitle}</IconTd>

      <Td>{formattedTotal}</Td>
      <Td>{formattedApy}</Td>

      <Divider />

      <td className="w-[350px] text-[14px] font-normal leading-[24px]">
        <div className="flex justify-center gap-4">
          <Button className="bg-[#2F8128] text-[#E1E3EA]" onClick={onBorrow}>
            Borrow
          </Button>
          <Button className="bg-[#262626] text-[#818A80]" onClick={onRepay}>
            Repay
          </Button>
        </div>
      </td>

      <Td>{`${balance?.toString() ?? "-"}/${ltv?.toString() ?? "-"}`}</Td>
    </tr>
  );
}