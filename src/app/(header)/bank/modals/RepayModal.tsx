import BigNumber from "bignumber.js";
import { useState } from "react";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";
import { useContract, usePrivateContract } from "@/apis/swr";

export default function RepayModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<string>("");

  const { data: borrowed } = usePrivateContract("BORROWAMOUNT", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "My debt(BorrowedAmount)", value: borrowed?.toString() ?? "-" },
    { name: "APY", value: apy?.toString() ?? "-" },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Borrow">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv ?? BigNumber(-1)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <HealthFactorGroup value={BigNumber(-1)} />

      <div className="flex flex-col gap-3">
        <ModalButton onClick={() => {}}>Confirm Borrow</ModalButton>
      </div>
    </Modal>
  );
}
