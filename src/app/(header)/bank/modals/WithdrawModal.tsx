import BigNumber from "bignumber.js";
import { useState } from "react";
import AmountGroup from "@/components/modal/AmountGroup";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import { ModalProps } from "@/components/modal/ModalProps";
import GasGroup from "@/components/modal/GasGroup";
import { useContract, usePrivateContract } from "@/apis/swr";
import { formatAPY, formatSupply } from "@/util/format";

export default function WithdrawModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<string>("");

  const { data: supply } = usePrivateContract("SUPPLYBALANCE", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);

  const content = [
    { name: "My Supply", value: formatSupply(supply) },
    { name: "APY", value: formatAPY(apy) },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Withdraw">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={BigNumber(0)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <GasGroup value={BigNumber(0)} />

      <ModalButton onClick={() => {}}>Withdraw</ModalButton>
    </Modal>
  );
}
