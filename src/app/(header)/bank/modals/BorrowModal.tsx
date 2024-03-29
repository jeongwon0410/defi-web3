import BigNumber from "bignumber.js";
import { useState } from "react";
import useSWR from "swr";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { AssetTitle } from "@/constants/assets";
import {
  getBalance,
  getBorrowableAmount,
  getMaxLTV,
  getSupplyAPY,
} from "@/apis/contract";
import { useTmpContext } from "@/components/TmpContext";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";

export default function BorrowModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));
  const { balance, borrowable, apy, ltv } = useData(assetTitle);

  const content = [
    { name: "Wallet balance", value: balance?.toString() ?? "-" },
    { name: "Borrowable Amount", value: borrowable?.toString() ?? "-" },
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

      <ModalButton onClick={() => {}}>Confirm Borrow</ModalButton>
    </Modal>
  );
}

const useData = (assetTitle: AssetTitle | null) => {
  const { address: account } = useTmpContext();
  if (account === null) throw new Error();

  const { data: balance } = useSWR(
    assetTitle && [assetTitle, account],
    ([title, account]) => getBalance(title, account),
  );
  const { data: borrowable } = useSWR(
    assetTitle && [assetTitle, account],
    ([title, account]) => getBorrowableAmount(title, account),
  );
  const { data: apy } = useSWR(assetTitle, getSupplyAPY);
  const { data: ltv } = useSWR(assetTitle, getMaxLTV);

  return { balance, borrowable, apy, ltv };
};
