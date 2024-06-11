import BigNumber from "bignumber.js";
import AssetGroup from "@/components/modal/AssetGroup";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import { formatTwoDecimal } from "@/util/format";

import { ModalButton } from "@/components/modal/ModalButton";
import { useSupplyModal } from "@/contracts";

export default function SupplyModalContent({
  assetTitle,
  close,
  apy,
  maxLTV,
  mySupply,
}: ModalProps & {
  apy?: BigNumber;
  maxLTV?: BigNumber;
  mySupply?: BigNumber;
}) {
  const { status, amount, setAmount, approve, supply, balance } =
    useSupplyModal(assetTitle, close);

  const content = [
    { name: "Wallet balance", value: formatTwoDecimal(balance) },
    { name: "Amount supplied", value: formatTwoDecimal(mySupply) },
    { name: "APY", value: formatTwoDecimal(apy) + "%" },
    { name: "Max LTV", value: formatTwoDecimal(maxLTV) + "%" },
  ];

  return (
    <>
      <AssetGroup title={assetTitle} content={content} />
      <AmountGroup
        assetTitle={assetTitle}
        amount={amount}
        setAmount={setAmount}
        maxAmount={balance && BigNumber(balance.toFixed(2, 1))}
      />

      <div className="flex flex-col gap-2">
        <ModalButton
          onClick={() => approve(BigNumber(amount))}
          disabled={status !== "approveNeeded"}
          loading={status === "approveLoading"}
        >
          Approve {assetTitle} to continue
        </ModalButton>

        <ModalButton
          onClick={() => supply(BigNumber(amount))}
          disabled={status !== "approved"}
          loading={status == "supplyLoading"}
        >
          Supply {assetTitle}
        </ModalButton>
      </div>
    </>
  );
}
