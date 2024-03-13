import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import BorrowTableData from "./BorrowTableData";
import BorrowTableField from "./BorrowTableField";
import {
  AAVEBalance,
  DAIBalance,
  EURSBalance,
  LINKBalance,
  USDCBalance,
  USDTBalance,
  WBTCBalance,
  WETHBalance,
} from "@/pages/api/balance";
import {
  dai_address,
  dai_contract,
  pool_contract,
  pool_data_provider_contract,
  usdc_address,
  usdc_contract,
} from "@/pages/api/common";

interface Props {
  tableRow: string[];
  tableCol: string[][];
  allMarket: boolean;
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

export default function BorrowTable({ tableRow, tableCol, allMarket }: Props) {
  const [openBorrow, setOpenBorrow] = useState(false);
  const [openRepay, setOpenRepay] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  const [balance, setBalance] = useState(0);

  const borrow = {
    name: "Borrow",
    content: [
      { name: "Wallet Balance", ratio: balance },
      { name: "Borrowable Amount", ratio: 0 },
      { name: "APY", ratio: 0 },
    ],
  };

  const repay = {
    name: "Repay",
    content: [
      { name: "My debt(Borrowed Amount)", ratio: 0 },
      { name: "APY", ratio: 0 },
    ],
  };

  const checkUserAccountData = async () => {
    const decimals = await usdc_contract.methods.decimals().call();
    const data = await pool_contract.methods
      .getUserAccountData(localStorage.getItem("account"))
      .call();

    // const data = await pool_contract.methods.getReserveData(dai_address).call();
    console.log(data);
  };

  const checkBalance = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIBalance().then((item) => setBalance(item ?? 0));
    } else if (cryptoName === name[1]) {
      USDTBalance().then((item) => setBalance(item ?? 0));
    } else if (cryptoName === name[2]) {
      USDCBalance().then((item) => setBalance(item ?? 0));
    } else if (cryptoName === name[3]) {
      WBTCBalance().then((item) => setBalance(item ?? 0));
    } else if (cryptoName === name[4]) {
      LINKBalance().then((item) => setBalance(item ?? 0));
    } else if (cryptoName === name[5]) {
      AAVEBalance().then((item) => setBalance(item ?? 0));
    } else if (cryptoName === name[6]) {
      EURSBalance().then((item) => setBalance(item ?? 0));
    } else {
      WETHBalance().then((item) => setBalance(item ?? 0));
    }
  };

  useEffect(() => {
    checkBalance(cryptoName);
    checkUserAccountData();
  }, [cryptoName]);

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
          max={0}
        />
      )}
      {openRepay && (
        <Modal
          setOpen={setOpenRepay}
          item={repay}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={0}
        />
      )}
    </div>
  );
}
