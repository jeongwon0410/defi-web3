import BigNumber from "bignumber.js";
import { useState } from "react";
import toast from "react-hot-toast";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import AmountGroup from "@/components/modal/AmountGroup";
import { ModalProps } from "@/components/modal/ModalProps";
import HealthFactorGroup from "@/components/modal/HealthFactorGroup";
import { useContract, usePrivateContract } from "@/apis/swr";
import {
  formatAPY,
  formatBalance,
  formatBorrowableAmount,
} from "@/util/format";
import { borrow as _borrow } from "@/apis/contract";
import { getErrorMessage } from "@/util/error";
import { AssetTitle } from "@/constants/assets";
import { useMetaMask } from "@/util/useMetaMask";

export default function BorrowModal({ assetTitle, close }: ModalProps) {
  const { amount, setAmount, status, borrow } = useBorrowModal(
    assetTitle,
    close,
  );

  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: borrowable } = usePrivateContract(
    "BORROWABLEAMOUNT",
    assetTitle,
  );
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "Wallet balance", value: formatBalance(balance) },
    { name: "Borrowable Amount", value: formatBorrowableAmount(borrowable) },
    { name: "APY", value: formatAPY(apy) },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Borrow">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={borrowable}
      />

      <HealthFactorGroup />

      {status === "loading" && <ModalButton disabled>Loading</ModalButton>}
      {status === "disabled" && (
        <ModalButton disabled>Confirm Borrow</ModalButton>
      )}
      {status === "enabled" && (
        <ModalButton onClick={borrow}>Confirm Borrow</ModalButton>
      )}
    </Modal>
  );
}

const useBorrowModal = (title: AssetTitle | null, close: () => void) => {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { wallet } = useMetaMask();

  const borrow = async () => {
    if (title === null) return;

    const account = wallet.accounts[0];
    if (account === undefined) return;

    try {
      setLoading(true);
      await _borrow(title, account, BigNumber(amount));
      toast.success("Borrowed!");
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
    borrow,
    status: loading
      ? "loading"
      : BigNumber(amount).isNaN()
        ? "disabled"
        : "enabled",
  };
};
