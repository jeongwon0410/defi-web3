import {
  AAVEBorrow,
  DAIBorrow,
  EURSBorrow,
  LINKBorrow,
  USDCBorrow,
  USDTBorrow,
  WBTCBorrow,
  WETHBorrow,
} from "@/apis/borrow";
import {
  pool_contract,
  pool_address,
  usdc_address,
  usdc_contract,
  dai_address,
  dai_contract,
  name,
} from "@/apis/common";
import { useEffect, useState } from "react";

interface Props {
  cryptoName: string;
  amount: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  max: string;
  account: string;
}
export default function ModalBorrowButton({
  cryptoName,
  amount,
  setOpen,
  max,
  account,
}: Props) {
  const [disable, setDisable] = useState(true);

  const [click, setClick] = useState(false);
  useEffect(() => {
    if (amount === "" || amount === "0") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [amount]);

  const borrow = async (tokenSupply: string, cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[1]) {
      USDTBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[2]) {
      USDCBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[3]) {
      WBTCBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[4]) {
      LINKBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[5]) {
      AAVEBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else if (cryptoName === name[6]) {
      EURSBorrow(tokenSupply, account).then(() => {
        setOpen(false);
      });
    } else {
      WETHBorrow(tokenSupply, account).then(() => {
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
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white "
        disabled={disable}
        onClick={() => borrow(amount, cryptoName)}
      >
        Confirm Borrow
      </button>
    </div>
  );
}
