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
  dai_address,
  name,
  pool_contract,
  usdc_address,
  usdt_address,
} from "@/apis/common";
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
import { useEffect, useState } from "react";

interface Props {
  amount: string;
  cryptoName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  max: string;
  account: string;
}

export default function ModalSupplyButton({
  amount,
  setOpen,
  cryptoName,
  max,
  account,
}: Props) {
  const [disable, setDisable] = useState(true);
  const [approveDisable, setApproveDisable] = useState(true);
  const [click, setClick] = useState(false);
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

  const supply = async (tokenSupply: string, cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAISupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[1]) {
      USDTSupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[2]) {
      USDCSupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[3]) {
      WBTCSupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[4]) {
      LINKSupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[5]) {
      AAVESupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[6]) {
      EURSSupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else {
      WETHSupply(tokenSupply, account).then(() => {
        setOpen(false);
      });
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
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white"
        disabled={approveDisable}
        onClick={() => approve(amount, cryptoName)}
      >
        Approve
      </button>

      <button
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white "
        disabled={disable}
        onClick={() => supply(amount, cryptoName)}
      >
        Confirm Supply
      </button>
    </div>
  );
}
