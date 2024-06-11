import BigNumber from "bignumber.js";
import AssetGroup from "@/components/modal/AssetGroup";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";
import { formatTwoDecimal } from "@/util/format";

import { ModalButton } from "@/components/modal/ModalButton";
import { useBorrowModal } from "@/contracts";

export default function BorrowModal({
  assetTitle,
  close,
  apy,
}: ModalProps & { apy?: BigNumber }) {
  const { amount, setAmount, status, borrow, balance, borrowable } =
    useBorrowModal(assetTitle, close);

  const content = [
    { name: "Wallet balance", value: formatTwoDecimal(balance) },
    { name: "Borrowable Amount", value: formatTwoDecimal(borrowable) },
    { name: "APY", value: formatTwoDecimal(apy) + "%" },
  ];

  return (
    <>
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        assetTitle={assetTitle}
        amount={amount}
        setAmount={setAmount}
        maxAmount={borrowable && BigNumber(borrowable.toFixed(2, 1))}
      />

      <HealthFactorGroup type="borrow" amount={amount} title={assetTitle} />

      <ModalButton
        onClick={borrow}
        disabled={status === "disabled"}
        loading={status === "loading"}
      >
        Confirm Borrow
      </ModalButton>
    </>
  );
}
