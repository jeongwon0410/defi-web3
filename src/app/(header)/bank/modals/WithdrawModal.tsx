import BigNumber from "bignumber.js";
import { useState } from "react";
import AmountGroup from "@/components/modal/AmountGroup";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";

type Props =
  | { type: "CLOSED" }
  | {
      type: "OPEN";

      imageURL: string;
      title: string;

      supplied: string;
      apy: string;

      onWithdraw: (amount: BigNumber) => void;
      onClose: () => void;
    };

export default function WithdrawModal(props: Props) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));

  if (props.type === "CLOSED") return <Modal isOpen={false}></Modal>;

  const content = [
    { name: "My Supply", value: props.supplied },
    { name: "APY", value: props.apy },
  ];

  return (
    <Modal isOpen onRequestClose={props.onClose} title="Withdraw">
      <AssetGroup
        title={props.title}
        imageURL={props.imageURL}
        content={content}
      />

      <AmountGroup
        ltv={BigNumber(0)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <ModalButton onClick={() => props.onWithdraw(amount)}>
        Withdraw
      </ModalButton>
    </Modal>
  );
}
