import BigNumber from "bignumber.js";
import { useState } from "react";
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
  formatSupply,
} from "@/util/format";
import { approve, supply } from "@/apis/contract";
import { useMetaMask } from "@/util/useMetaMask";
import { AssetTitle } from "@/constants/assets";

export default function SupplyModal({ assetTitle, close }: ModalProps) {
  const { amount, setAmount, approve, supply } = useSupplyModal(assetTitle);

  const { data: balance } = usePrivateContract("BALANCE", assetTitle);
  const { data: supplyBalance } = usePrivateContract(
    "SUPPLYBALANCE",
    assetTitle,
  );
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  const content = [
    { name: "Wallet balance", value: formatBalance(balance) },
    { name: "Amount supplied", value: formatSupply(supplyBalance) },
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

      <div className="flex flex-col gap-3">
        <ModalButton onClick={approve}>Approve</ModalButton>
        <ModalButton onClick={supply}>Confirm Supply</ModalButton>
      </div>
    </Modal>
  );
}

const useSupplyModal = (title: AssetTitle | null) => {
  const [amount, setAmount] = useState<string>("");
  const { wallet } = useMetaMask();

  return {
    approve: () => {
      if (wallet.accounts.length === 0) throw new Error();
      if (title === null) return;

      const account = wallet.accounts[0];
      approve(title, account, BigNumber(amount));
    },
    supply: () => {
      if (wallet.accounts.length === 0) throw new Error();
      if (title === null) return;

      const account = wallet.accounts[0];
      supply(title, account, BigNumber(amount));
    },
    amount,
    setAmount,
  };
};
