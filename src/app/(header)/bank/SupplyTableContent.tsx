import { IconTd, Td, Divider, Button } from "./Table";
import { SupplyTableCol } from "./SupplyTable";
import SupplyModal from "./modals/SupplyModal";
import WithdrawModal from "./modals/WithdrawModal";
import { normalize } from "@/util/bignumber";
import { AssetTitle } from "@/constants/assets";
import { TABLE_PREVIEW_CNT } from "@/constants/common";
import { useModal } from "@/util/hook";

type Props = {
  cols: SupplyTableCol[];
  expanded: boolean;
};

export default function SupplyTableContent({ cols, expanded }: Props) {
  const { isOpen, openModal, close } = useModal<"supply" | "withdraw">();

  const colsToShow = expanded ? cols : cols.slice(0, TABLE_PREVIEW_CNT);

  return (
    <tbody>
      {colsToShow.map((col, idx) => (
        <Tr
          key={idx}
          col={col}
          onSupply={() => openModal("supply", col.title as AssetTitle)}
          onWithdraw={() => openModal("withdraw", col.title as AssetTitle)}
        />
      ))}

      <SupplyModal assetTitle={isOpen("supply")} close={close} />
      <WithdrawModal assetTitle={isOpen("withdraw")} close={close} />
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
