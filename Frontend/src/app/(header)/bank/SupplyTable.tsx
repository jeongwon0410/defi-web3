"use client";

import TableHeader from "./TableHeader";

import { Button, Divider, IconTd, Table, Td, Tr } from "./Table";
import { formatTwoDecimal } from "@/util/format";
import { SupplyRowData, OpenModal } from "@/contracts/type";
import { titleToIcon } from "@/contracts/assets";

const rows = [
  { value: "Asset" },
  { value: "Total Supplied" },
  { value: "APY / LTV" },
  { value: "Available" },
  { value: "" },
  { value: "Supply & Withdraw", highlighted: true },
  { value: "Supplied" },
];

export default function SupplyTable({
  data,
  openModal,
}: {
  data: SupplyRowData[];
  openModal: OpenModal;
}) {
  return (
    <Table>
      <TableHeader rows={rows} />
      <tbody>
        {data.map((data) => (
          <SupplyTableRow
            key={data.assetTitle}
            data={data}
            openModal={openModal}
          />
        ))}
      </tbody>
    </Table>
  );
}

const SupplyTableRow = ({
  data,
  openModal,
}: {
  data: SupplyRowData;
  openModal: OpenModal;
}) => {
  return (
    <Tr>
      <IconTd src={titleToIcon[data.assetTitle]}>{data.assetTitle}</IconTd>

      <Td width="17.5ch">{formatTwoDecimal(data.totalSupplied)}</Td>
      <Td width="17.5ch">{`${formatTwoDecimal(data.apy)}%/${formatTwoDecimal(data.ltv)}%`}</Td>
      <Td width="17.5ch">{formatTwoDecimal(data.available)}</Td>

      <Divider />

      <Td>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-[#2F8128] text-[#E1E3EA]"
            onClick={() => openModal("supply", data.assetTitle)}
          >
            Supply
          </Button>
          <Button
            className="bg-[#262626] text-[#818A80]"
            onClick={() => openModal("withdraw", data.assetTitle)}
          >
            Withdraw
          </Button>
        </div>
      </Td>

      <Td width="17.5ch">{formatTwoDecimal(data.supplied)}</Td>
    </Tr>
  );
};
