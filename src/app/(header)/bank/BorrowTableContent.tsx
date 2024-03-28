import { useState } from "react";
import { Button, Divider, IconTd, Td } from "./Table";
import { BorrowTableCol } from "./BorrowTable";
import BorrowModal from "./modals/BorrowModal";
import { normalize } from "@/util/bignumber";
import { RAY_DECIMALS, TABLE_PREVIEW_CNT } from "@/constants/common";

interface Props {
  cols: BorrowTableCol[];
  expanded: boolean;
}

export default function BorrowTableContent({ cols, expanded }: Props) {
  const [borrowIdx, setBorrowIdx] = useState<number | null>(null);
  const [repayIdx, setRepayIdx] = useState<number | null>(null);

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
          onBorrow={() => setBorrowIdx(idx)}
          onRepay={() => setRepayIdx(idx)}
        />
      ))}
      <BorrowModal
        {...(borrowIdx !== null
          ? {
              type: "OPEN",
              imageURL: "",
              title: cols[supplyIdx].title,
              balance: cols[supplyIdx].balance,
              supplied: cols[supplyIdx].supply,
              apy: cols[supplyIdx].apy,
              ltv: cols[supplyIdx].ltv,
              onApprove: async (amount) => {
                const asset = cols[supplyIdx].title as AssetTitle;
                await supply(asset, account, amount);
              },
              onSupply: async (amount) => {
                const asset = cols[supplyIdx].title as AssetTitle;
                await supply(asset, account, amount);
              },
              onClose: () => setSupplyIdx(null),
            }
          : { type: "CLOSED" })}
      />
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
