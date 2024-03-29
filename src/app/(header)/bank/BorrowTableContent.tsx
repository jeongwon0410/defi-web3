import { Button, Divider, IconTd, Td } from "./Table";
import { BorrowTableCol } from "./BorrowTable";
import BorrowModal from "./modals/BorrowModal";
import RepayModal from "./modals/RepayModal";
import { normalize } from "@/util/bignumber";
import { RAY_DECIMALS, TABLE_PREVIEW_CNT } from "@/constants/common";
import { AssetTitle } from "@/constants/assets";
import { useModal } from "@/util/hook";

interface Props {
  cols: BorrowTableCol[];
  expanded: boolean;
}

export default function BorrowTableContent({ cols, expanded }: Props) {
  const { isOpen, openModal, close } = useModal<"borrow" | "repay">();

  const colsToShow = expanded ? cols : cols.slice(0, TABLE_PREVIEW_CNT);

  return (
    <tbody>
      {colsToShow.map((col, idx) => (
        <Tr
          key={idx}
          col={col}
          onBorrow={() => openModal("borrow", col.title as AssetTitle)}
          onRepay={() => openModal("repay", col.title as AssetTitle)}
        />
      ))}
      <BorrowModal assetTitle={isOpen("borrow")} close={close} />
      <RepayModal assetTitle={isOpen("repay")} close={close} />
    </tbody>
  );
}

const Tr = ({
  col,
  onBorrow,
  onRepay,
}: {
  col: BorrowTableCol;
  onBorrow: () => void;
  onRepay: () => void;
}) => {
  const formattedTotal =
    "$" +
    col.totalBorrow
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const formattedApy =
    (parseFloat(normalize(col.apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return (
    <tr className="column h-[74px]">
      <IconTd src={col.imageURL}>{col.title}</IconTd>

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

      <Td>{`${col.balance}/${col.ltv}`}</Td>
    </tr>
  );
};
