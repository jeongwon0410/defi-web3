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
import {
  pool_contract,
  pool_address,
  usdc_address,
  usdc_contract,
  name,
} from "@/apis/common";
import {
  AAVERepay,
  DAIRepay,
  EURSRepay,
  LINKRepay,
  USDCRepay,
  USDTRepay,
  WBTCRepay,
  WETHRepay,
} from "@/apis/repay";
import { useEffect, useState } from "react";

interface Props {
  cryptoName: string;
  amount: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  max: string;
  account: string;
}
export default function ModalRepayButton({
  cryptoName,
  amount,
  setOpen,
  max,
  account,
}: Props) {
  const [disable, setDisable] = useState(true);
  const [approveDisable, setApproveDisable] = useState(true);
  useEffect(() => {
    if (account) {
      if (amount === "" || amount === "0") {
        setApproveDisable(true);
      } else {
        setApproveDisable(false);
      }
    }
  }, [amount]);

  const approve = async (tokenSupply: string, cryptoName: string) => {
    // Token approval

    if (cryptoName === name[0]) {
      DAIAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[1]) {
      USDTAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[2]) {
      USDCAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[3]) {
      WBTCAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[4]) {
      LINKAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[5]) {
      AAVEAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[6]) {
      EURSAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else {
      WETHAprove(tokenSupply, account).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    }
  };

  const repay = async (tokenSupply: string) => {
    if (cryptoName === name[0]) {
      DAIRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[1]) {
      USDTRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[2]) {
      USDCRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[3]) {
      WBTCRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[4]) {
      LINKRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[5]) {
      AAVERepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[6]) {
      EURSRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else {
      WETHRepay(tokenSupply, account).then(() => {
        setOpen(false);
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="p-3 rounded-[20px]  bg-[#151615] flex  justify-between h-[50px]">
        <div className="flex text-[#B0B0B0]">Health factor</div>
        <div className="flex text-[#B0B0B0]">{"00 -> 00"}</div>
      </div>

      <button
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white"
        disabled={approveDisable}
        onClick={() => approve(amount, cryptoName)}
      >
        Approve
      </button>

      <button
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white "
        disabled={disable}
        onClick={() => repay(amount)}
      >
        Confirm Repay
      </button>
    </div>
  );
}
