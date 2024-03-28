import { useState } from "react";

import { IconTd, Td, Divider, Button } from "./Table";
import { SupplyTableCol } from "./SupplyTable";
import SupplyModal from "./SupplyModal";
import { TABLE_PREVIEW_CNT } from "@/constants/common";
import { normalize } from "@/util/bignumber";
import Modal from "@/components/modal/Modal";
import { allAssetTitles, AssetTitle } from "@/constants/assets";

type Props = {
  cols: SupplyTableCol[];
  expanded: boolean;
};

export default function SupplyTableContent({ cols, expanded }: Props) {
  // const choiceMax = async (cryptoName: string, account: string) => {
  //     DAIMaxAmount(account).then((item) => setMax(item ?? "0"));
  // };

  const [supplyModalAsset, setSupplyModalAsset] = useState<AssetTitle | null>(
    null,
  );

  const handleWithdrawClick = (idx: number) => {
    // TODO
    idx;
  };

  return (
    <tbody>
      {(expanded ? cols : cols.slice(0, TABLE_PREVIEW_CNT)).map((col, idx) => (
        <Tr
          key={idx}
          col={col}
          onSupply={() => setSupplyModalAsset(allAssetTitles[idx])}
          onWithdraw={() => handleWithdrawClick(idx)}
        />
      ))}
      <SupplyModal
        assetTitle={supplyModalAsset}
        close={() => setSupplyModalAsset(null)}
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
