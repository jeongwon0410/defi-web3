import { useState } from "react";

import { IconTd, Td, Divider, Button } from "./Table";
import { SupplyTableCol } from "./SupplyTable";
import SupplyModal from "./SupplyModal";
import WithdrawModal from "./WithdrawModal";
import { TABLE_PREVIEW_CNT } from "@/constants/common";
import { normalize } from "@/util/bignumber";
import { supply } from "@/apis";
import { AssetTitle } from "@/constants/assets";

type Props = {
  cols: SupplyTableCol[];
  account: string;
  expanded: boolean;
};

export default function SupplyTableContent({ cols, account, expanded }: Props) {
  const [supplyIdx, setSupplyIdx] = useState<number | null>(null);
  const [withdrawIdx, setWithdrawIdx] = useState<number | null>(null);

  return (
    <tbody>
      {(expanded ? cols : cols.slice(0, TABLE_PREVIEW_CNT)).map((col, idx) => (
        <Tr
          key={idx}
          col={col}
          onSupply={() => setSupplyIdx(idx)}
          onWithdraw={() => setWithdrawIdx(idx)}
        />
      ))}

      <SupplyModal
        {...(supplyIdx !== null
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

      <WithdrawModal
        {...(withdrawIdx !== null
          ? {
              type: "OPEN",
              imageURL: "",
              title: cols[withdrawIdx].title.toString(),
              supplied: cols[withdrawIdx].supply.toString(),
              apy: cols[withdrawIdx].apy.toString(),
              onWithdraw: async () => {},
              onClose: () => setWithdrawIdx(null),
            }
          : { type: "CLOSED" })}
      />
    </tbody>
  );
}

const Tr = ({
  col,
  onSupply,
  onWithdraw,
}: {
  col: SupplyTableCol;
  onSupply: () => void;
  onWithdraw: () => void;
}) => {
  const RAY_DECIMALS = 27;
  const formattedApy =
    (parseFloat(normalize(col.apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  const formattedLtv =
    parseFloat(col.ltv.dividedBy(100).toString()).toFixed(2) + "%";

  const formattedBalance =
    "$" +
    col.balance
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const formattedSupply = col.supply.toFixed(18);

  return (
    <tr className="h-[74px]">
      <IconTd src={col.imageURL}>{col.title}</IconTd>

      <Td>{col.totalSupplied.toString()}</Td>
      <Td>{`${formattedApy}/${formattedLtv}`}</Td>
      <Td>{formattedBalance}</Td>

      <Divider />

      <td className="w-[350px] text-[14px] font-normal leading-[24px]">
        <div className="flex justify-center gap-4">
          <Button className="bg-[#2F8128] text-[#E1E3EA]" onClick={onSupply}>
            Supply
          </Button>
          <Button className="bg-[#262626] text-[#818A80]" onClick={onWithdraw}>
            Withdraw
          </Button>
        </div>
      </td>

      <Td>{formattedSupply}</Td>
    </tr>
  );
};
