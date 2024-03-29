import BigNumber from "bignumber.js";
import { useState } from "react";
import useSWR from "swr";
import AmountGroup from "@/components/modal/AmountGroup";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import { ModalProps } from "@/components/modal/ModalProps";
import { getMySupplyBalance, getSupplyAPY } from "@/apis/contract";
import { AssetTitle } from "@/constants/assets";
import { useTmpContext } from "@/components/TmpContext";
import GasGroup from "@/components/modal/GasGroup";

export default function WithdrawModal({ assetTitle, close }: ModalProps) {
  const [amount, setAmount] = useState<BigNumber>(BigNumber(0));
  const { supply, apy } = useData(assetTitle);

  const content = [
    { name: "My Supply", value: supply?.toString() ?? "-" },
    { name: "APY", value: apy?.toString() ?? "-" },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Withdraw">
      <AssetGroup title={assetTitle ?? ""} imageURL={""} content={content} />

      <AmountGroup
        ltv={BigNumber(0)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={BigNumber(0)}
      />

      <GasGroup value={BigNumber(0)} />

      <ModalButton onClick={() => {}}>Withdraw</ModalButton>
    </Modal>
  );
}

const useData = (assetTitle: AssetTitle | null) => {
  const { address: account } = useTmpContext();

  const { data: supply } = useSWR(
    account && assetTitle ? [assetTitle, account] : null,
    ([title, account]) => getMySupplyBalance(title, account),
  );
  const { data: apy } = useSWR(assetTitle, getSupplyAPY);

  return { supply, apy };
};
