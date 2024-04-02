import BigNumber from "bignumber.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";
import { useContract, usePrivateContract } from "@/apis/swr";
import { formatAPY, formatDebt } from "@/util/format";
import { AssetTitle } from "@/constants/assets";
import { getErrorMessage } from "@/util/error";
import { repay as _repay } from "@/apis/contract";
import { LoadingButton, ModalButton } from "@/components/modal/ModalButton";

export default function RepayModal({ assetTitle, close }: ModalProps) {
  const { amount, setAmount, repay, status } = useRepayModal(assetTitle, close);

  const { data: borrowed } = usePrivateContract("BORROWAMOUNT", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "My debt", value: formatDebt(borrowed) },
    { name: "APY", value: formatAPY(apy) },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Repay">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={borrowed}
      />

      <HealthFactorGroup />

      {status === "loading" && <LoadingButton />}
      {status === "disabled" && (
        <ModalButton disabled>Confirm Repay</ModalButton>
      )}
      {status === "enabled" && (
        <ModalButton onClick={repay}>Confirm Repay</ModalButton>
      )}
    </Modal>
  );
}

const useRepayModal = (title: AssetTitle | null, close: () => void) => {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const repay = async () => {
    if (title === null) return;

    if (address === undefined) return;

    try {
      setLoading(true);
      await _repay(title, address, BigNumber(amount));
      toast.success("Repayed!");
      close();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return {
    amount,
    setAmount,
    repay,
    status: loading
      ? "loading"
      : BigNumber(amount).isNaN()
        ? "disabled"
        : "enabled",
  };
};
