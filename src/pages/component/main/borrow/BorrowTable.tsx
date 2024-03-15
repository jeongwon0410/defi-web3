import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import BorrowTableData from "./BorrowTableData";
import BorrowTableField from "./BorrowTableField";
import { Contract } from "@ethersproject/contracts";
import {
  aave_oracle_contract,
  dai_address,
  dai_contract,
  link_address,
  name,
  pool_contract,
  pool_data_provider_contract,
  usdc_address,
  usdc_contract,
  usdt_address,
} from "@/pages/api/common";
import {
  AAVEBorrowTotal,
  DAIBorrowTotal,
  EURSBorrowTotal,
  LINKBorrowTotal,
  USDCBorrowTotal,
  USDTBorrowTotal,
  WBTCBorrowTotal,
  WETHBorrowTotal,
} from "@/pages/api/borrowTotal";
import { ethers } from "ethers";
import {
  BigNumberValue,
  normalize,
  valueToZDBigNumber,
} from "@/pages/api/bignumber";
import {
  AAVEBorrowAPY,
  DAIBorrowAPY,
  EURSBorrowAPY,
  LINKBorrowAPY,
  USDCBorrowAPY,
  USDTBorrowAPY,
  WBTCBorrowAPY,
  WEHTBorrowAPY,
} from "@/pages/api/borrowAPY";
import { DAIMySupplyRatio } from "@/pages/api/supplyRatio";

interface Props {
  allMarket: boolean;
}

const tableRow = [
  "Asset",
  "Total Borrow",
  "Borrow APY",
  "",
  "Borrow&Repay",
  "My Status/LTV",
];

export default function BorrowTable({ allMarket }: Props) {
  const [openBorrow, setOpenBorrow] = useState(false);
  const [openRepay, setOpenRepay] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  const [balance, setBalance] = useState("0");
  const [borrowAmount, setBorrowAmount] = useState("0");
  const [borrowableAmount, setBorrowableAmount] = useState("0");
  const [daiTotalBalance, setDaiTotalBalance] = useState("0");
  const [usdtTotalBalance, setUsdtTotalBalance] = useState("0");
  const [usdcTotalBalance, setUsdcTotalBalance] = useState("0");
  const [wbtcTotalBalance, setWbtcTotalBalance] = useState("0");
  const [linkTotalBalance, setLinkTotalBalance] = useState("0");
  const [aaveTotalBalance, setAaveTotalBalance] = useState("0");
  const [eursTotalBalance, setEursTotalBalance] = useState("0");
  const [wethTotalBalance, setWethTotalBalance] = useState("0");

  const [daiBorrowAPY, setDaiBorrowAPY] = useState("0%");
  const [usdtBorrowAPY, setUsdtBorrowAPY] = useState("0%");
  const [usdcBorrowAPY, setUsdcBorrowAPY] = useState("0%");
  const [wbtcBorrowAPY, setWbtcBorrowAPY] = useState("0%");
  const [linkBorrowAPY, setLinkBorrowAPY] = useState("0%");
  const [aaveBorrowAPY, setAaveBorrowAPY] = useState("0%");
  const [eursBorrowAPY, setEursBorrowAPY] = useState("0%");
  const [wethBorrowAPY, setWethBorrowAPY] = useState("0%");

  const [apy, setAPY] = useState("0%");

  const tableCol = [
    ["ETH.png", "DAI", daiTotalBalance, daiBorrowAPY, "0.00%"],
    ["ETH.png", "USDT", usdtTotalBalance, usdtBorrowAPY, "0.00%"],
    ["usdc.png", "USDC", usdcTotalBalance, usdcBorrowAPY, "0.00%"],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
    ["wbtc.png", "WBTC", wbtcTotalBalance, wbtcBorrowAPY, "0.00%"],
    ["ETH.png", "LINK", linkTotalBalance, linkBorrowAPY, "0.00%"],
    ["ETH.png", "AAVE", aaveTotalBalance, aaveBorrowAPY, "0.00%"],
    ["ETH.png", "EURS", eursTotalBalance, eursBorrowAPY, "0.00%"],
    ["ETH.png", "WETH", wethTotalBalance, wethBorrowAPY, "0.00%"],
  ];

  const borrow = {
    name: "Borrow",
    content: [
      { name: "Wallet Balance", ratio: balance },
      { name: "Borrowable Amount", ratio: borrowableAmount },
      { name: "APY", ratio: apy },
    ],
  };

  const repay = {
    name: "Repay",
    content: [
      { name: "My debt(Borrowed Amount)", ratio: borrowAmount },
      { name: "APY", ratio: "0" },
    ],
  };

  const checkUserAccountData = async () => {
    DAIMySupplyRatio().then(() => console.log);
  };

  const checkTotalBorrow = async () => {
    DAIBorrowTotal().then((item) => setDaiTotalBalance(item ?? "0"));
    USDTBorrowTotal().then((item) => setUsdtTotalBalance(item ?? "0"));
    USDCBorrowTotal().then((item) => setUsdcTotalBalance(item ?? "0"));
    WBTCBorrowTotal().then((item) => setWbtcTotalBalance(item ?? "0"));
    LINKBorrowTotal().then((item) => setLinkTotalBalance(item ?? "0"));
    AAVEBorrowTotal().then((item) => setAaveTotalBalance(item ?? "0"));
    EURSBorrowTotal().then((item) => setEursTotalBalance(item ?? "0"));
    WETHBorrowTotal().then((item) => setWethTotalBalance(item ?? "0"));
  };

  const checkBorrowAPY = async () => {
    DAIBorrowAPY().then((item) => setDaiBorrowAPY(item ?? "0%"));
    USDTBorrowAPY().then((item) => setUsdtBorrowAPY(item ?? "0%"));
    USDCBorrowAPY().then((item) => setUsdcBorrowAPY(item ?? "0%"));
    WBTCBorrowAPY().then((item) => setWbtcBorrowAPY(item ?? "0%"));
    LINKBorrowAPY().then((item) => setLinkBorrowAPY(item ?? "0%"));
    AAVEBorrowAPY().then((item) => setAaveBorrowAPY(item ?? "0%"));
    EURSBorrowAPY().then((item) => setEursBorrowAPY(item ?? "0%"));
    WEHTBorrowAPY().then((item) => setWethBorrowAPY(item ?? "0%"));
  };

  const choiceBorrowAPY = (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setAPY(daiBorrowAPY);
    } else if (cryptoName === name[1]) {
      setAPY(usdtBorrowAPY);
    } else if (cryptoName === name[2]) {
      setAPY(usdcBorrowAPY);
    } else if (cryptoName === name[3]) {
      setAPY(wbtcBorrowAPY);
    } else if (cryptoName === name[4]) {
      setAPY(linkBorrowAPY);
    } else if (cryptoName === name[5]) {
      setAPY(aaveBorrowAPY);
    } else if (cryptoName === name[6]) {
      setAPY(eursBorrowAPY);
    } else {
      setAPY(wethBorrowAPY);
    }
  };

  useEffect(() => {
    checkUserAccountData();
    checkTotalBorrow();
    checkBorrowAPY();
  }, []);

  useEffect(() => {
    choiceBorrowAPY(cryptoName);
  }, [cryptoName]);

  return (
    <div className="w-full  ">
      <table className="table w-full text-center px-20">
        <thead className="">
          <BorrowTableField tableRow={tableRow} />
        </thead>
        <tbody>
          <BorrowTableData
            setBalance={setBalance}
            tableCol={tableCol}
            setOpenBorrow={setOpenBorrow}
            setOpenRepay={setOpenRepay}
            allMarket={allMarket}
            setCryptoName={setCryptoName}
            setCryptoImg={setCryptoImg}
            setBorrowAmount={setBorrowAmount}
            setBorrowableAmount={setBorrowableAmount}
          />
        </tbody>
      </table>
      {openBorrow && (
        <Modal
          setOpen={setOpenBorrow}
          item={borrow}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={borrowableAmount}
        />
      )}
      {openRepay && (
        <Modal
          setOpen={setOpenRepay}
          item={repay}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={"0"}
        />
      )}
    </div>
  );
}
