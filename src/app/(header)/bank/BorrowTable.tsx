import TableHeader from "./TableHeader";
import BorrowTableRow from "./BorrowTableRow";
import BorrowModal from "./modals/BorrowModal";
import RepayModal from "./modals/RepayModal";
import { Table } from "./Table";
import { allAssetTitles } from "@/constants/assets";
import { TABLE_PREVIEW_CNT } from "@/constants/common";
import { useModal } from "@/util/hook";

export default function BorrowTable({ expanded }: { expanded: boolean }) {
  const { isOpen, openModal, close } = useModal<"borrow" | "repay">();

  const assetTitleList = expanded
    ? allAssetTitles
    : allAssetTitles.slice(0, TABLE_PREVIEW_CNT);

  return (
    <Table>
      <TableHeader rows={rows} />
      <tbody>
        {assetTitleList.map((assetTitle) => (
          <BorrowTableRow
            key={assetTitle}
            assetTitle={assetTitle}
            onBorrow={() => openModal("borrow", assetTitle)}
            onRepay={() => openModal("repay", assetTitle)}
          />
        ))}
      </tbody>
      <BorrowModal assetTitle={isOpen("borrow")} close={close} />
      <RepayModal assetTitle={isOpen("repay")} close={close} />
    </Table>
  );
}

const rows = [
  { value: "Asset" },
  { value: "Total borrow" },
  { value: "Borrow APY" },
  { value: "" },
  { value: "Borrow & Repay", highlighted: true },
  { value: "My status / LTV" },
];
