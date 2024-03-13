import {
  AAVEAprove,
  DAIAprove,
  EURSAprove,
  LINKAprove,
  USDCAprove,
  USDTAprove,
  WBTCAprove,
  WETHAprove,
} from "@/pages/api/approve";
import { pool_contract, usdc_address } from "@/pages/api/common";
import {
  AAVESupply,
  DAISupply,
  EURSSupply,
  LINKSupply,
  USDCSupply,
  USDTSupply,
  WBTCSupply,
  WETHSupply,
} from "@/pages/api/supply";
import { useEffect, useState } from "react";

interface Props {
  amount: string;
  cryptoName: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const name = [
  "DAI",
  "USDT",
  "USDC",
  // "ETH",
  "WBTC",
  "LINK",
  "AAVE",
  "EURS",
  "WETH",
];
export default function ModalSupplyButton({
  amount,
  setOpen,
  cryptoName,
}: Props) {
  const [disable, setDisable] = useState(true);
  const [approveDisable, setApproveDisable] = useState(false);
  const [click, setClick] = useState(false);
  useEffect(() => {
    if (amount === "" || amount === "0") {
      setApproveDisable(true);
    } else {
      setApproveDisable(false);
    }
  }, [amount]);

  const approve = async (tokenSupply: number, cryptoName: string) => {
    // Token approval
    if (cryptoName === name[0]) {
      DAIAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[1]) {
      USDTAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[2]) {
      USDCAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[3]) {
      WBTCAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[4]) {
      LINKAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[5]) {
      AAVEAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else if (cryptoName === name[6]) {
      EURSAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    } else {
      WETHAprove(tokenSupply).then(() => {
        setDisable(false);
        setApproveDisable(true);
      });
    }
  };

  const supply = async (tokenSupply: number, cryptoName: string) => {
    // Supply
    if (cryptoName === name[0]) {
      DAISupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[1]) {
      USDTSupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[2]) {
      USDCSupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[3]) {
      WBTCSupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[4]) {
      LINKSupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[5]) {
      AAVESupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[6]) {
      EURSSupply(tokenSupply).then(() => {
        setOpen(false);
      });
    } else {
      WETHSupply(tokenSupply).then(() => {
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
        onClick={() => approve(parseInt(amount), cryptoName)}
      >
        Approve
      </button>

      <button
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white "
        disabled={disable}
        onClick={() => supply(parseInt(amount), cryptoName)}
      >
        Confirm Supply
      </button>
    </div>
  );
}
