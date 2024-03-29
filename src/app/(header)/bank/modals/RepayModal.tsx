import BigNumber from "bignumber.js";
import { useState } from "react";
import useSWR from "swr";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { AssetTitle } from "@/constants/assets";
import { getBorrowAmount, getMaxLTV, getSupplyAPY } from "@/apis/contract";
import { useTmpContext } from "@/components/TmpContext";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";

export default function RepayModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));
  const { borrowed, apy, ltv } = useData(assetTitle);

  const content = [
    { name: "My debt(BorrowedAmount)", value: borrowed?.toString() ?? "-" },
    { name: "APY", value: apy?.toString() ?? "-" },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Borrow">
      <AssetGroup title={assetTitle ?? ""} imageURL={""} content={content} />

      <AmountGroup
        ltv={ltv ?? BigNumber(-1)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <HealthFactorGroup value={BigNumber(-1)} />

      <div className="flex flex-col gap-3">
        <ModalButton onClick={() => {}}>Confirm Borrow</ModalButton>
      </div>
    </Modal>
  );
}

const useData = (assetTitle: AssetTitle | null) => {
  const { address: account } = useTmpContext();
  if (account === null) throw new Error();

  const { data: borrowed } = useSWR(
    assetTitle && [assetTitle, account],
    ([title, account]) => getBorrowAmount(title, account),
  );
  const { data: apy } = useSWR(assetTitle, getSupplyAPY);
  const { data: ltv } = useSWR(assetTitle, getMaxLTV);

  return { borrowed, apy, ltv };
};
