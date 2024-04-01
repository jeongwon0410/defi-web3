import BigNumber from "bignumber.js";
import { useState } from "react";
import toast from "react-hot-toast";
import AmountGroup from "@/components/modal/AmountGroup";
import AssetGroup from "@/components/modal/AssetGroup";
import Modal from "@/components/modal/Modal";
import ModalButton from "@/components/modal/ModalButton";
import { ModalProps } from "@/components/modal/ModalProps";
import GasGroup from "@/components/modal/GasGroup";
import { useContract, usePrivateContract } from "@/apis/swr";
import { formatAPY, formatSupplied } from "@/util/format";
import { useMetaMask } from "@/util/useMetaMask";
import { withdraw } from "@/apis/contract";
import { AssetTitle } from "@/constants/assets";
import { getErrorMessage } from "@/util/error";

export default function WithdrawModal({ assetTitle, close }: ModalProps) {
  const { loading, amount, setAmount, withdraw } = useWithdrawModal(
    assetTitle,
    close,
  );

  const { data: supply } = usePrivateContract("SUPPLYBALANCE", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "My Supply", value: formatSupplied(supply) },
    { name: "APY", value: formatAPY(apy) },
  ];

  return (
    <Modal isOpen={assetTitle !== null} onRequestClose={close} title="Withdraw">
      <AssetGroup title={assetTitle} content={content} />

      <AmountGroup
        ltv={ltv}
        amount={amount}
        setAmount={setAmount}
        dollar={BigNumber(0)}
        maxAmount={supply}
      />

      <GasGroup value={BigNumber(0)} />

      {loading && <ModalButton disabled>Loading...</ModalButton>}
      {loading === false && (
        <ModalButton onClick={withdraw}>Withdraw</ModalButton>
      )}
    </Modal>
  );
}

const useWithdrawModal = (assetTitle: AssetTitle | null, close: () => void) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const { wallet } = useMetaMask();

  const _withdraw = async () => {
    if (wallet.accounts.length === 0 || assetTitle === null) return;
    const account = wallet.accounts[0];

    try {
      setLoading(true);
      await withdraw(assetTitle, account, BigNumber(amount));
      toast.success("Withdrawed!");
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
    withdraw: _withdraw,
    loading,
    disabled: loading || BigNumber(amount).isNaN(),
  };
};
