import { useState } from "react";
import Modal from "../../modal/Modal";
import SupplyTableField from "./SupplyTableField";
import SupplyTableData from "./SupplyTableData";

interface Props {
  tableRow: string[];
  tableCol: string[][];
  allMarket: boolean;
}
const supply = {
  name: "Supply",
  content: [
    { name: "Wallet Balance", ratio: "00.00" },
    { name: "Amount Supplied", ratio: "00.00" },
    { name: "APY", ratio: "00.00" },
    { name: "Max LTV", ratio: "00.00" },
  ],
};

const withdraw = {
  name: "Withdraw",
  content: [
    { name: "My Supply", ratio: "00.00" },
    { name: "APY", ratio: "00.00" },
  ],
};
export default function SupplyTable({ tableRow, tableCol, allMarket }: Props) {
  const [openSupply, setOpenSupply] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  return (
    <div className="w-full ">
      <table className="table w-full text-center px-20">
        <thead className="">
          <SupplyTableField tableRow={tableRow} />
        </thead>
        <tbody>
          <SupplyTableData
            tableCol={tableCol}
            setOpenSupply={setOpenSupply}
            setOpenWithdraw={setOpenWithdraw}
            allMarket={allMarket}
            setCryptoName={setCryptoName}
            setCryptoImg={setCryptoImg}
          />
        </tbody>
      </table>
      {openSupply && (
        <Modal
          setOpen={setOpenSupply}
          item={supply}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
        />
      )}
      {openWithdraw && (
        <Modal
          setOpen={setOpenWithdraw}
          item={withdraw}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
        />
      )}
    </div>
  );
}
