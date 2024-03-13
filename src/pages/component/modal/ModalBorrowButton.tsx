import {
  pool_contract,
  pool_address,
  usdc_address,
  usdc_contract,
} from "@/pages/api/common";
import { useEffect, useState } from "react";

interface Props {
  cryptoName: string;
  amount: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalBorrowButton({
  cryptoName,
  amount,
  setOpen,
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

  const borrow = async (tokenSupply: number) => {
    const account = localStorage.getItem("account");

    await pool_contract.methods
      .borrow(usdc_address, tokenSupply / 10, 2, "0", account)
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        console.log("TX Hash Borrow", hash);
      })
      .on("error", (error: any) => {
        console.log("Supply Error", error);
      })
      .on("receipt", (receipt: any) => {
        console.log("Mined", receipt);
        if (receipt.status == "0x1" || receipt.status == 1) {
          console.log("Transaction Success");
        } else console.log("Transaction Failed");
      });
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
        onClick={() => {}}
      >
        Confirm Borrow
      </button>
    </div>
  );
}
