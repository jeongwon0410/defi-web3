import TableHeader from "./TableHeader";
import { Button, Divider, IconTd, Table, Td, Tr } from "./Table";
import { formatLiquidity, formatTwoDecimal } from "@/util/format";
import { BorrowRowData, OpenModal } from "@/contracts/type";
import { titleToIcon } from "@/contracts/assets";

const rows = [
  { value: "Asset" },
  { value: "Total borrow" },
  { value: "Borrow APY" },
  { value: "Available Liquidity" },
  { value: "" },
  { value: "Borrow & Repay", highlighted: true },
  { value: "My status / LTV" },
];

export default function BorrowTable({
  data,
  openModal,
}: {
  data: BorrowRowData[];
  openModal: OpenModal;
}) {
  return (
    <Table>
      <TableHeader rows={rows} />
      <tbody>
        {data.map((data) => (
          <BorrowTableRow
            key={data.assetTitle}
            data={data}
            openModal={openModal}
          />
        ))}
      </tbody>
    </Table>
  );
}

const BorrowTableRow = ({
  data,
  openModal,
}: {
  data: BorrowRowData;
  openModal: OpenModal;
}) => {
  return (
    <Tr>
      <IconTd src={titleToIcon[data.assetTitle]}>{data.assetTitle}</IconTd>

      <Td width="17.5ch">{formatTwoDecimal(data.totalBorrowed)}</Td>
      <Td width="17.5ch">{formatTwoDecimal(data.apy)}%</Td>
      <Td width="17.5ch">{formatLiquidity(data.liquidity)}</Td>

      <Divider />

      <Td>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-[#2F8128] text-[#E1E3EA]"
            onClick={() => openModal("borrow", data.assetTitle)}
          >
            Borrow
          </Button>
          <Button
            className="bg-[#262626] text-[#818A80]"
            onClick={() => openModal("repay", data.assetTitle)}
          >
            Repay
          </Button>
        </div>
      </Td>

      <Td width="17.5ch">{`$${formatTwoDecimal(data.status)} / ${formatTwoDecimal(data.ltv)}%`}</Td>
    </Tr>
  );
};
