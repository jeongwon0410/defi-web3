import { Button, Divider, IconTd, Td, Tr } from "./Table";
import { normalize } from "@/util/bignumber";
import { RAY_DECIMALS } from "@/constants/common";
import { AssetTitle, titleToIcon } from "@/constants/assets";
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
    <Tr>
      <IconTd src={titleToIcon[assetTitle]}>{assetTitle}</IconTd>

      <Td>{formattedTotal}</Td>
      <Td>{formattedApy}</Td>

      <Divider />

      <Td>
        <div className="flex justify-center gap-4">
          <Button className="bg-[#2F8128] text-[#E1E3EA]" onClick={onBorrow}>
            Borrow
          </Button>
          <Button className="bg-[#262626] text-[#818A80]" onClick={onRepay}>
            Repay
          </Button>
        </div>
      </Td>

      <Td>{`${balance?.toString() ?? "-"}/${ltv?.toString() ?? "-"}`}</Td>
    </Tr>
  );
}
