import { useState } from "react";
import Modal from "../../modal/Modal";
import BorrowTableData from "./BorrowTableData";
import BorrowTableField from "./BorrowTableField";

interface Props {
  tableRow: string[];
  tableCol: string[][];
  allMarket: boolean;
}

const borrow = {
  name: "Borrow",
  content: [
    { name: "Wallet Balance", ratio: "00.00" },
    { name: "Borrowable Amount", ratio: "00.00" },
    { name: "APY", ratio: "00.00" },
  ],
};

const repay = {
  name: "Repay",
  content: [
    { name: "My debt(Borrowed Amount)", ratio: "00.00" },
    { name: "APY", ratio: "00.00" },
  ],
};

export default function BorrowTable({ tableRow, tableCol, allMarket }: Props) {
  const [openBorrow, setOpenBorrow] = useState(false);
  const [openRepay, setOpenRepay] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  return (
    <div className="w-full  ">
      <table className="table w-full text-center px-20">
        <thead className="">
          <BorrowTableField tableRow={tableRow} />
        </thead>
        <tbody>
          <BorrowTableData
            tableCol={tableCol}
            setOpenBorrow={setOpenBorrow}
            setOpenRepay={setOpenRepay}
            allMarket={allMarket}
            setCryptoName={setCryptoName}
            setCryptoImg={setCryptoImg}
          />
        </tbody>
      </table>
      {openBorrow && (
        <Modal
          setOpen={setOpenBorrow}
          item={borrow}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
        />
      )}
      {openRepay && (
        <Modal
          setOpen={setOpenRepay}
          item={repay}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
        />
      )}
    </div>
  );
}
