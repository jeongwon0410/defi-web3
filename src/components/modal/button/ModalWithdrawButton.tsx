import {
  AAVEAprove,
  DAIAprove,
  EURSAprove,
  LINKAprove,
  USDCAprove,
  USDTAprove,
  WBTCAprove,
  WETHAprove,
} from "@/apis/approve";
import { name, pool_contract, usdc_address } from "@/apis/common";
import {
  AAVESupply,
  DAISupply,
  EURSSupply,
  LINKSupply,
  USDCSupply,
  USDTSupply,
  WBTCSupply,
  WETHSupply,
} from "@/apis/supply";
import {
  AAVEWithdraw,
  DAIWithdraw,
  EURSWithdraw,
  LINKWithdraw,
  USDCWithdraw,
  USDTWithdraw,
  WBTCWithdraw,
  WETHWithdraw,
} from "@/apis/withdraw";
import { useEffect, useState } from "react";

interface Props {
  amount: string;
  cryptoName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  max: string;
  account: string;
}

export default function ModalWithdrawButton({
  amount,
  setOpen,
  cryptoName,
  max,
  account,
}: Props) {
  const [disable, setDisable] = useState(true);
  const [approveDisable, setApproveDisable] = useState(false);
  const [click, setClick] = useState(false);
  useEffect(() => {
    if (account) {
      if (amount === "" || amount === "0") {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [amount]);

  const withdraw = async (tokenSupply: string, cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else if (cryptoName === name[1]) {
      USDTWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else if (cryptoName === name[2]) {
      USDCWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else if (cryptoName === name[3]) {
      WBTCWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else if (cryptoName === name[4]) {
      LINKWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else if (cryptoName === name[5]) {
      AAVEWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else if (cryptoName === name[6]) {
      EURSWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    } else {
      WETHWithdraw(setDisable, tokenSupply, account).then(() => setOpen(false));
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full ">
        <img src="local_gas_station.png" className="h-[20px] w-[20px]" />
        <div className="font-pretendard font-nomal text-[16px] leading-[20px] text-[#535353]">
          $00.00
        </div>
      </div>

      <button
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white "
        disabled={disable}
        onClick={() => withdraw(amount, cryptoName)}
      >
        Confirm Withdraw
      </button>
    </div>
  );
}
