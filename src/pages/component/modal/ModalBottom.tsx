import {
  pool_contract,
  pool_contract_addr,
  usdc_avax_address,
  usdc_contract,
} from "@/pages/api/common";
import { useEffect, useState } from "react";

interface Props {
  name: string;
  amount: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalBottom({ name, amount, setOpen }: Props) {
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
  const approveUSDC = async (tokenSupply: number) => {
    // Token approval
    await usdc_contract.methods
      .approve(pool_contract_addr, tokenSupply)
      .send({ from: localStorage.getItem("account") })
      .on("transactionHash", (hash: any) => {
        console.log("TX Hash Approve", hash);
        setClick(true);
      })
      .on("error", (error: any) => {
        console.log("Approve Error", error);
      })
      .on("receipt", (receipt: any) => {
        if (receipt.status == "0x1" || receipt.status == 1) {
          console.log("Transaction Success");
          setDisable(false);
        } else console.log("Transaction Failed");
      });
  };
  const supply = async (tokenSupply: number) => {
    // Supply
    await pool_contract.methods
      .supply(
        usdc_avax_address,
        tokenSupply,
        localStorage.getItem("account"),
        "0"
      )
      .send({ from: localStorage.getItem("account") })
      .on("transactionHash", (hash: any) => {
        console.log("TX Hash Supply", hash);
        setDisable(true);
      })
      .on("error", (error: any) => {
        console.log("Supply Error", error);
      })
      .on("receipt", (receipt: any) => {
        if (receipt.status == "0x1" || receipt.status == 1) {
          console.log("Transaction Success");
          setOpen(false);
        } else console.log("Transaction Failed");
      });
  };

  return (
    <div className="w-full flex flex-col">
      {name === "Supply" || name === "Withdraw" ? (
        <div className="flex w-full ">
          <img src="local_gas_station.png" className="h-[20px] w-[20px]" />
          <div className="font-pretendard font-nomal text-[16px] leading-[20px] text-[#535353]">
            $00.00
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-[20px]  bg-[#151615] flex  justify-between h-[50px]">
          <div className="flex text-[#B0B0B0]">Health factor</div>
          <div className="flex text-[#B0B0B0]">{"00 -> 00"}</div>
        </div>
      )}
      {name === "Supply" && click === false && (
        <button
          className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white"
          disabled={approveDisable}
          onClick={() => approveUSDC(parseInt(amount))}
        >
          Approve
        </button>
      )}
      <button
        className="disabled:bg-gray-300 mt-5 py-4 rounded-lg bg-[#52A44B] font-pretendard font-bold text-[20px] leading-[25px] text-white "
        disabled={disable}
        onClick={() => supply(parseInt(amount))}
      >
        Confirm {name}
      </button>
    </div>
  );
}
