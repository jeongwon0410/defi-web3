import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import SupplyTableField from "./SupplyTableField";
import SupplyTableData from "./SupplyTableData";
import {
  dai_contract,
  pool_data_provider_contract,
  usdc_contract,
} from "../../../api/common";
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
  AAVESupplyBalance,
  DAISupplyBalance,
  EURSSupplyBalance,
  LINKSupplyBalance,
  USDCSupplyBalance,
  USDTSupplyBalance,
  WBTCSupplyBalance,
  WETHSupplyBalance,
} from "@/pages/api/supplyBalance";
import { DAISupplyTotal } from "@/pages/api/supplyTotal";
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

export default function SupplyTable({ tableRow, tableCol, allMarket }: Props) {
  const [openSupply, setOpenSupply] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  const [balance, setBalance] = useState(0);
  const [mySupply, setMySupply] = useState(0);
  const supply = {
    name: "Supply",
    content: [
      { name: "Wallet Balance", ratio: balance },
      { name: "Amount Supplied", ratio: 0 },
      { name: "APY", ratio: 0 },
      { name: "Max LTV", ratio: 0 },
    ],
  };

  const withdraw = {
    name: "Withdraw",
    content: [
      { name: "My Supply", ratio: mySupply },
      { name: "APY", ratio: 0 },
    ],
  };

  const checkSupply = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAISupplyBalance().then((item) => setMySupply(item ?? 0));
    } else if (cryptoName === name[1]) {
      USDTSupplyBalance().then((item) => setMySupply(item ?? 0));
    } else if (cryptoName === name[2]) {
      USDCSupplyBalance().then((item) => setMySupply(item ?? 0));
    } else if (cryptoName === name[3]) {
      WBTCSupplyBalance().then((item) => setMySupply(item ?? 0));
    } else if (cryptoName === name[4]) {
      LINKSupplyBalance().then((item) => setMySupply(item ?? 0));
    } else if (cryptoName === name[5]) {
      AAVESupplyBalance().then((item) => setMySupply(item ?? 0));
    } else if (cryptoName === name[6]) {
      EURSSupplyBalance().then((item) => setMySupply(item ?? 0));
    } else {
      WETHSupplyBalance().then((item) => setMySupply(item ?? 0));
    }
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

  // const checkTotalSupply = async () => {
  //   DAISupplyTotal().then(() => console.log());
  // };

  useEffect(() => {
    if (openSupply) {
      checkBalance(cryptoName);
    }

    if (openWithdraw) {
      checkSupply(cryptoName);
    }

    // checkTotalSupply();
  }, [cryptoName, openSupply, openWithdraw]);

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
          max={balance}
        />
      )}
      {openWithdraw && (
        <Modal
          setOpen={setOpenWithdraw}
          item={withdraw}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={mySupply}
        />
      )}
    </div>
  );
}
