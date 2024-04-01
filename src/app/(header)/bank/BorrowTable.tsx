import TableHeader from "./TableHeader";
import BorrowTableRow from "./BorrowTableRow";
import { Table } from "./Table";
import { allAssetTitles } from "@/constants/assets";
import { TABLE_PREVIEW_CNT } from "@/constants/common";

export default function BorrowTable({ expanded }: { expanded: boolean }) {
  const assetTitleList = expanded
    ? allAssetTitles
    : allAssetTitles.slice(0, TABLE_PREVIEW_CNT);

  return (
    <Table>
      <TableHeader rows={rows} />
      <tbody>
        {assetTitleList.map((assetTitle) => (
          <BorrowTableRow key={assetTitle} assetTitle={assetTitle} />
        ))}
      </tbody>
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
