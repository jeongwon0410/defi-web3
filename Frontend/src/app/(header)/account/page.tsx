"use client";

import { Table } from "./Table";
import { BorrowTr, SupplyTr } from "./Row";
import { useMyAccount } from "@/contracts";
import { formatTwoDecimal } from "@/util/format";

export default function AccountMain() {
  const { supplyBalance, supplyTable, borrowBalance, borrowTable } =
    useMyAccount();

  return (
    <div className="flex items-start justify-center gap-[2.56rem] self-stretch">
      <Table
        title="SUPPLY"
        balance={formatTwoDecimal(supplyBalance)}
        header={["Asset", "Supplied", "APY", "MAXLTV"]}
      >
        {supplyTable.map((data, idx) => (
          <SupplyTr key={idx} data={data} />
        ))}
      </Table>
      <Table
        title="BORROW"
        balance={formatTwoDecimal(borrowBalance)}
        header={["Asset", "Borrowed", "APY", "MAXLTV", "LIQUIDATION"]}
      >
        {borrowTable.map((data, idx) => (
          <BorrowTr key={idx} data={data} />
        ))}
      </Table>
    </div>
  );
}
