"use client";

import { IconTd, Td, Divider, Button, Tr } from "./Table";
import SupplyModal from "./modals/SupplyModal";
import WithdrawModal from "./modals/WithdrawModal";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";
import { useModal } from "@/util/hook";
import {
  formatAPY,
  formatBalance,
  formatLTV,
  formatSupplied,
  formatTotalSupply,
} from "@/util/format";

export default function SupplyTableRow({
  assetTitle,
}: {
  assetTitle: AssetTitle;
}) {
  const { openModal, isOpen, close } = useModal();

  const { data: totalSupplied } = useContract("SUPPLYTOTAL", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);
  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: supply } = usePrivateContract("SUPPLYBALANCE", assetTitle);

  return (
    <Tr>
      <IconTd src={titleToIcon[assetTitle]}>{assetTitle}</IconTd>

      <Td width="16ch">{formatTotalSupply(totalSupplied)}</Td>
      <Td width="12ch">{`${formatAPY(apy)}/${formatLTV(ltv)}`}</Td>
      <Td width="12ch">{formatBalance(balance)}</Td>

      <Divider />

      <Td>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-[#2F8128] text-[#E1E3EA]"
            onClick={() => openModal("supply", assetTitle)}
          >
            Supply
          </Button>
          <Button
            className="bg-[#262626] text-[#818A80]"
            onClick={() => openModal("withdraw", assetTitle)}
          >
            Withdraw
          </Button>
        </div>
      </Td>

      <Td width="12ch">{formatSupplied(supply)}</Td>

      <SupplyModal assetTitle={isOpen("supply")} close={close} />
      <WithdrawModal assetTitle={isOpen("withdraw")} close={close} />
    </Tr>
  );
}
