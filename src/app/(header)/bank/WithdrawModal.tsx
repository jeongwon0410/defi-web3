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

      onWithdraw: () => void;
      onClose: () => void;
    };

export default function WithdrawModal(props: Props) {
  if (props.type === "CLOSED") return <Modal isOpen={false}></Modal>;

  const content = [
    { name: "My Supply", value: props.supplied },
    { name: "APY", value: props.apy },
  ];

  return (
    <Modal isOpen onRequestClose={props.onClose} title={props.title}>
      <AssetGroup
        title={props.title}
        imageURL={props.imageURL}
        content={content}
      />
      <ModalButton onClick={props.onWithdraw}>Withdraw</ModalButton>
    </Modal>
  );
}
