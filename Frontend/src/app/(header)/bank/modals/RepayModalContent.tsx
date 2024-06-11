import BigNumber from "bignumber.js";
import AssetGroup from "@/components/modal/AssetGroup";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";
import { formatTwoDecimal } from "@/util/format";
import { ModalButton } from "@/components/modal/ModalButton";
import { useRepayModal } from "@/contracts";

export default function RepayModal({
  assetTitle,
  close,
  apy,
}: ModalProps & { apy?: BigNumber }) {
  const { amount, setAmount, repay, status, approve, myDebt, repayable } =
    useRepayModal(assetTitle, close);

  const content = [
    { name: "My debt", value: formatTwoDecimal(myDebt) },
    { name: "APY", value: formatTwoDecimal(apy) + "%" },
  ];

  return (
    <>
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        assetTitle={assetTitle}
        amount={amount}
        setAmount={setAmount}
        maxAmount={repayable}
      />

      <HealthFactorGroup type="repay" amount={amount} title={assetTitle} />

      <div className="flex flex-col gap-2">
        <ModalButton
          onClick={() => approve(BigNumber(amount))}
          disabled={status !== "approveNeeded"}
          loading={status === "approveLoading"}
        >
          Approve {assetTitle} to continue
        </ModalButton>

        <ModalButton
          onClick={() => repay(BigNumber(amount))}
          disabled={status !== "approved"}
          loading={status == "supplyLoading"}
        >
          Repay {assetTitle}
        </ModalButton>
      </div>
    </>
  );
}
