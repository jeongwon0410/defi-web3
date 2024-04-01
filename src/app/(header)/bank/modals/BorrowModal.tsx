import BigNumber from "bignumber.js";
import { useState } from "react";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";
import { useContract, usePrivateContract } from "@/apis/swr";
import {
  formatAPY,
  formatBalance,
  formatBorrowableAmount,
} from "@/util/format";

export default function BorrowModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<string>("");

  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: borrowable } = usePrivateContract(
    "BORROWABLEAMOUNT",
    assetTitle,
  );
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "Wallet balance", value: formatBalance(balance) },
    { name: "Borrowable Amount", value: formatBorrowableAmount(borrowable) },
    { name: "APY", value: formatAPY(apy) },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Borrow">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <HealthFactorGroup value={BigNumber(-1)} />

      <ModalButton onClick={() => {}}>Confirm Borrow</ModalButton>
    </Modal>
  );
}
