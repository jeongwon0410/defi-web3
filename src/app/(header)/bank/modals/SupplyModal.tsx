import BigNumber from "bignumber.js";
import { useState } from "react";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import GasGroup from "@/components/modal/GasGroup";
import { useContract, usePrivateContract } from "@/apis/swr";

export default function SupplyModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));

  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: supply } = usePrivateContract("SUPPLYBALANCE", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "Wallet balance", value: balance?.toString() ?? "-" },
    { name: "Amount supplied", value: supply?.toString() ?? "-" },
    { name: "APY", value: apy?.toString() ?? "-" },
    { name: "Max LTV", value: ltv?.toString() ?? "-" },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Supply">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv ?? BigNumber(-1)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <GasGroup value={BigNumber(0)} />

      <div className="flex flex-col gap-3">
        <ModalButton onClick={() => {}}>Approve</ModalButton>
        <ModalButton onClick={() => {}}>Confirm Supply</ModalButton>
      </div>
    </Modal>
  );
}
