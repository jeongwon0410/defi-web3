"use client";

import { Button, Divider, IconTd, Td, Tr } from "./Table";
import BorrowModal from "./modals/BorrowModal";
import RepayModal from "./modals/RepayModal";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";
import { useModal } from "@/util/hook";
import {
  formatAPY,
  formatBalance,
  formatLiquidity,
  formatTotalBorrow,
} from "@/util/format";

export default function BorrowTableRow({
  assetTitle,
}: {
  assetTitle: AssetTitle;
}) {
  const { isOpen, openModal, close } = useModal();

  const { data: totalBorrow } = useContract("BORROWTOTAL", assetTitle);
  const { data: apy } = useContract("BORROWAPY", assetTitle);
  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);
  const { data: liquidity } = useContract("LIQUIDITY", assetTitle);

  return (
    <Tr>
      <IconTd src={titleToIcon[assetTitle]}>{assetTitle}</IconTd>

      <Td width="16ch">{formatTotalBorrow(totalBorrow)}</Td>
      <Td width="8ch">{formatAPY(apy)}</Td>

      <Divider />

      <Td>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-[#2F8128] text-[#E1E3EA]"
            onClick={() => openModal("borrow", assetTitle)}
          >
            Borrow
          </Button>
          <Button
            className="bg-[#262626] text-[#818A80]"
            onClick={() => openModal("repay", assetTitle)}
          >
            Repay
          </Button>
        </div>
      </Td>

      <Td width="16ch">{`${formatBalance(balance)}/${ltv?.toString() ?? "-"}`}</Td>

      <Td width="12ch">{formatLiquidity(liquidity)}</Td>

      <BorrowModal assetTitle={isOpen("borrow")} close={close} />
      <RepayModal assetTitle={isOpen("repay")} close={close} />
    </Tr>
  );
}
