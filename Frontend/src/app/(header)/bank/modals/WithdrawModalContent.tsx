import BigNumber from "bignumber.js";
import AmountGroup from "@/components/modal/AmountGroup";
import AssetGroup from "@/components/modal/AssetGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import { formatTwoDecimal } from "@/util/format";
import { ModalButton } from "@/components/modal/ModalButton";
import { useWithdrawModal } from "@/contracts";

export default function WithdrawModalContent({
  assetTitle,
  close,
  apy,
  mySupply,
}: ModalProps & { apy?: BigNumber; mySupply?: BigNumber }) {
  const { status, amount, setAmount, withdraw, withdrawable } =
    useWithdrawModal(assetTitle, close);

  const content = [
    { name: "My Supply", value: formatTwoDecimal(mySupply) },
    { name: "APY", value: formatTwoDecimal(apy) + "%" },
  ];

  return (
    <>
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        assetTitle={assetTitle ?? "DAI"}
        amount={amount}
        setAmount={setAmount}
        maxAmount={
          mySupply &&
          withdrawable &&
          BigNumber.min(mySupply.toFixed(2, 1), withdrawable.toFixed(2, 1))
        }
      />

      <ModalButton
        onClick={withdraw}
        disabled={status === "disabled"}
        loading={status === "loading"}
      >
        Withdraw
      </ModalButton>
    </>
  );
}
