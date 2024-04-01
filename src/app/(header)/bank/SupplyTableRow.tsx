"use client";

import { IconTd, Td, Divider, Button, Tr } from "./Table";
import SupplyModal from "./modals/SupplyModal";
import WithdrawModal from "./modals/WithdrawModal";
import { normalize } from "@/util/bignumber";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";
import { RAY_DECIMALS } from "@/constants/common";
import { useModal } from "@/util/hook";

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

  const formattedApy = apy
    ? (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%"
    : "-";

  const formattedLtv = ltv
    ? parseFloat(ltv.dividedBy(100).toString()).toFixed(2) + "%"
    : "-";

  const formattedBalance =
    "$" +
    (balance
      ? balance
          .toFixed(2)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
      : "-");

  const formattedSupply = supply?.toFixed(18) ?? "-";

  return (
    <Tr>
      <IconTd src={titleToIcon[assetTitle]}>{assetTitle}</IconTd>

      <Td>{totalSupplied?.toString() ?? "-"}</Td>
      <Td>{`${formattedApy}/${formattedLtv}`}</Td>
      <Td>{formattedBalance}</Td>

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

      <Td>{formattedSupply}</Td>

      <SupplyModal assetTitle={isOpen("supply")} close={close} />
      <WithdrawModal assetTitle={isOpen("withdraw")} close={close} />
    </Tr>
  );
}
