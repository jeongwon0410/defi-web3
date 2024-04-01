import TableHeader from "./TableHeader";
import SupplyTableRow from "./SupplyTableRow";

import { Table } from "./Table";
import { allAssetTitles } from "@/constants/assets";
import { TABLE_PREVIEW_CNT } from "@/constants/common";

export default function SupplyTable({ expanded }: { expanded: boolean }) {
  const assetTitleList = expanded
    ? allAssetTitles
    : allAssetTitles.slice(0, TABLE_PREVIEW_CNT);

  return (
    <Table>
      <TableHeader rows={rows} />
      <tbody>
        {assetTitleList.map((assetTitle) => (
          <SupplyTableRow key={assetTitle} assetTitle={assetTitle} />
        ))}
      </tbody>
    </Table>
  );
}

const rows = [
  { value: "Asset" },
  { value: "Total Supplied" },
  { value: "APY / LTV" },
  { value: "Available" },
  { value: "" },
  { value: "Supply & Withdraw", highlighted: true },
  { value: "Supplied" },
];
