import BigNumber from "bignumber.js";
import { useState } from "react";
import toast from "react-hot-toast";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import GasGroup from "@/components/modal/GasGroup";
import { useContract, usePrivateContract } from "@/apis/swr";
import {
  formatAPY,
  formatBalance,
  formatLTV,
  formatSupplied,
} from "@/util/format";
import { approve as _approve, supply as _supply } from "@/apis/contract";
import { useMetaMask } from "@/util/useMetaMask";
import { AssetTitle } from "@/constants/assets";
import { getErrorMessage } from "@/util/error";

type Status = "disabled" | "notApproved" | "approved" | "loading";

export default function SupplyModal({ assetTitle, close }: ModalProps) {
  const { type, amount, setAmount, approve, supply } = useSupplyModal(
    assetTitle,
    close,
  );

  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: supplyBalance } = usePrivateContract(
    "SUPPLYBALANCE",
    assetTitle,
  );
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "Wallet balance", value: formatBalance(balance) },
    { name: "Amount supplied", value: formatSupplied(supplyBalance) },
    { name: "APY", value: formatAPY(apy) },
    { name: "Max LTV", value: formatLTV(ltv) },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Supply">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv ?? BigNumber(-1)}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={balance}
      />

      <GasGroup value={BigNumber(0)} />

      {type === "loading" && <ModalButton disabled>Loading...</ModalButton>}
      {type === "disabled" && <ModalButton disabled>Approve</ModalButton>}
      {type === "notApproved" && (
        <ModalButton onClick={approve}>Approve</ModalButton>
      )}
      {type === "approved" && (
        <ModalButton onClick={supply}>Confirm Supply</ModalButton>
      )}
    </Modal>
  );
}

const useSupplyModal = (title: AssetTitle | null, close: () => void) => {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { wallet } = useMetaMask();

  const { data: approvedAmount, mutate } = usePrivateContract(
    "APPROVEDAMOUNT",
    title,
  );

  const type = getType(loading, BigNumber(amount), approvedAmount);

  const account = wallet.accounts?.[0];

  const approve = async () => {
    if (title === null) return;

    try {
      setLoading(true);
      await _approve(title, account, BigNumber(amount));
      mutate();
      toast.success("Approved!");
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const supply = async () => {
    if (title === null) return;

    try {
      setLoading(true);
      await _supply(title, account, BigNumber(amount));
      toast.success("Supplied!");
      close();
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return {
    approve,
    supply,
    amount,
    setAmount,
    type,
  };
};

const getType = (
  loading: boolean,
  amount: BigNumber,
  approvedAmount?: BigNumber,
): Status => {
  if (loading) return "loading";
  if (approvedAmount === undefined) return "disabled";
  if (amount.isNaN() || amount.isEqualTo(0)) return "disabled";
  return amount.comparedTo(approvedAmount) <= 0 ? "approved" : "notApproved";
};
