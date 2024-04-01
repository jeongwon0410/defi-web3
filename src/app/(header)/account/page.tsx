import BigNumber from "bignumber.js";
import BalanceHeader from "./BalanceHeader";
import AccountTable from "./AccountTable";
import SupplyTr from "./SupplyTr";
import BorrowTr from "./BorrowTr";
import { allAssetTitles } from "@/constants/assets";

const supplyHeader = ["Asset", "Supplied", "APY", "MAXLTV"];
const borrowHeader = ["Asset", "Borrowed", "APY", "MAXLTV", "LIQUIDATION"];

export default function AccountMain() {
  return (
    <div className="flex flex-col gap-[2.56rem] lg:flex-row">
      <div className="flex flex-col overflow-hidden rounded-lg">
        <BalanceHeader title="SUPPLY" balance={BigNumber(0)} />
        <AccountTable header={supplyHeader}>
          {allAssetTitles.map((assetTitle) => (
            <SupplyTr assetTitle={assetTitle} key={assetTitle} />
          ))}
        </AccountTable>
      </div>

      <div className="overflow-hidden rounded-lg">
        <BalanceHeader title="BORROW" balance={BigNumber(0)} />
        <AccountTable header={borrowHeader}>
          {allAssetTitles.map((assetTitle) => (
            <BorrowTr assetTitle={assetTitle} key={assetTitle} />
          ))}
        </AccountTable>
      </div>
    </div>
  );
}
