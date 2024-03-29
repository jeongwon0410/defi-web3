import TableHeader from "./TableHeader";
import SupplyTableRow from "./SupplyTableRow";

import SupplyModal from "./modals/SupplyModal";

import WithdrawModal from "./modals/WithdrawModal";
import { Table } from "./Table";
import { allAssetTitles } from "@/constants/assets";
import { useModal } from "@/util/hook";
import { TABLE_PREVIEW_CNT } from "@/constants/common";

export default function SupplyTable({ expanded }: { expanded: boolean }) {
  const { isOpen, openModal, close } = useModal<"supply" | "withdraw">();

  const assetTitleList = expanded
    ? allAssetTitles
    : allAssetTitles.slice(0, TABLE_PREVIEW_CNT);

  return (
    <Table>
      <TableHeader rows={rows} />
      <tbody>
        {assetTitleList.map((assetTitle) => (
          <SupplyTableRow
            key={assetTitle}
            assetTitle={assetTitle}
            onSupply={() => openModal("supply", assetTitle)}
            onWithdraw={() => openModal("withdraw", assetTitle)}
          />
        ))}
      </tbody>
      <SupplyModal assetTitle={isOpen("supply")} close={close} />
      <WithdrawModal assetTitle={isOpen("withdraw")} close={close} />
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
