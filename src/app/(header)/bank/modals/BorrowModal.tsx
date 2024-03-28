import BigNumber from "bignumber.js";
import { useState } from "react";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";

type Props =
  | { type: "CLOSED" }
  | {
      type: "OPEN";

      imageURL: string;
      title: string;

      balance: BigNumber;
      borrowableAmount: BigNumber;
      apy: BigNumber;
      ltv: BigNumber;

      onApprove: (amount: BigNumber) => void;
      onSupply: (amount: BigNumber) => void;

      onClose: () => void;
    };

export default function BorrowModal(props: Props) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));

  if (props.type === "CLOSED") return <Modal isOpen={false}></Modal>;

  const content = [
    { name: "Wallet balance", value: props.balance.toString() },
    { name: "Amount supplied", value: props.supplied.toString() },
    { name: "APY", value: props.apy.toString() },
    { name: "Max LTV", value: props.ltv.toString() },
  ];

  return (
    <Modal isOpen onRequestClose={props.onClose} title="Supply">
      <AssetGroup
        title={props.title}
        imageURL={props.imageURL}
        content={content}
      />

      <AmountGroup
        ltv={props.ltv}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <div className="flex flex-col gap-3">
        <ModalButton onClick={() => {}}>Approve</ModalButton>
        <ModalButton onClick={() => {}}>Confirm Supply</ModalButton>
      </div>
    </Modal>
  );
}
