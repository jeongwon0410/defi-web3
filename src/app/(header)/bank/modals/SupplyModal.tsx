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
  getMaxLTV,
  getMySupplyBalance,
  getSupplyAPY,
} from "@/apis/contract";
import { useTmpContext } from "@/components/TmpContext";
import { ModalProps } from "@/components/modal/ModalProps";
import GasGroup from "@/components/modal/GasGroup";

export default function SupplyModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));
  const { balance, supply, apy, ltv } = useData(assetTitle);

  const content = [
    { name: "Wallet balance", value: balance?.toString() ?? "-" },
    { name: "Amount supplied", value: supply?.toString() ?? "-" },
    { name: "APY", value: apy?.toString() ?? "-" },
    { name: "Max LTV", value: ltv?.toString() ?? "-" },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Supply">
      <AssetGroup title={assetTitle ?? ""} imageURL={""} content={content} />

      <AmountGroup
        ltv={ltv ?? BigNumber(-1)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <GasGroup value={BigNumber(0)} />

      <div className="flex flex-col gap-3">
        <ModalButton onClick={() => {}}>Approve</ModalButton>
        <ModalButton onClick={() => {}}>Confirm Supply</ModalButton>
      </div>
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
  const { data: supply } = useSWR(
    assetTitle && [assetTitle, account],
    ([title, account]) => getMySupplyBalance(title, account),
  );
  const { data: apy } = useSWR(assetTitle, getSupplyAPY);
  const { data: ltv } = useSWR(assetTitle, getMaxLTV);

  return { balance, supply, apy, ltv };
};
