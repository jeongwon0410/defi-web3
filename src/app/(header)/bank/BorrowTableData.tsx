import { Button, Divider, IconTd, Td } from "./Table";
import { BorrowTableCol } from "./BorrowTable";
import { normalize } from "@/util/bignumber";
import { RAY_DECIMALS, TABLE_PREVIEW_CNT } from "@/constants/common";

interface Props {
  cols: BorrowTableCol[];
  expanded: boolean;
}

export default function BorrowTableData({ cols, expanded }: Props) {
  const handleBorrowClick = (idx: number) => {
    idx;
    // DAIBorrowableAmount(account).then((item) =>
    //   setBorrowableAmount(item ?? " 0"),
    // );
  };

  const handleRepayClick = (idx: number) => {
    idx;
    // DAIBorrowAmount(account).then((item) => setBorrowAmount(item ?? " 0"));
  };

  return (
    <tbody>
      {(expanded ? cols : cols.slice(0, TABLE_PREVIEW_CNT)).map((col, idx) => (
        <Tr
          key={idx}
          col={col}
          onBorrow={() => handleBorrowClick(idx)}
          onRepay={() => handleRepayClick(idx)}
        />
      ))}
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
