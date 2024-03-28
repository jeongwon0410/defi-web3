import Modal from "@/components/modal/Modal";
import AssetInfo from "@/components/modal/AssetInfo";
import { AssetTitle } from "@/constants/assets";

export default function SupplyModal({
  assetTitle,
  close,
}: {
  assetTitle: AssetTitle | null;
  close: () => void;
}) {
  return (
    <Modal title="Supply" isOpen={assetTitle !== null} onRequestClose={close}>
      {assetTitle !== null && <Content assetTitle={assetTitle} />}
    </Modal>
  );
}

const Content = ({ assetTitle }: { assetTitle: string }) => {
  const content = [
    {
      name: "Wallet balance",
      value: "",
    },
    {
      name: "Amount supplied",
      value: "",
    },
    {
      name: "APY",
      value: "",
    },
    {
      name: "Max LTV",
      value: "",
    },
  ];

  return (
    <>
      <AssetInfo title={assetTitle} imageURL="" content={content} />
    </>
  );
};
