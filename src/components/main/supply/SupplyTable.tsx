import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import SupplyTableField from "./SupplyTableField";
import SupplyTableData from "./SupplyTableData";
import {
  dai_address,
  dai_contract,
  name,
  pool_contract,
  pool_data_provider_contract,
  usdc_contract,
  weth_address,
  weth_contract,
} from "../../../apis/common";

import {
  AAVESupplyTotal,
  DAISupplyTotal,
  EURSSupplyTotal,
  LINKSupplyTotal,
  USDCSupplyTotal,
  USDTSupplyTotal,
  WBTCSupplyTotal,
  WETHSupplyTotal,
} from "@/apis/supplyTotal";
import {
  AAVESupplyMaxLTV,
  DAISupplyMaxLTV,
  EURSSupplyMaxLTV,
  LINKSupplyMaxLTV,
  USDCSupplyMaxLTV,
  USDTSupplyMaxLTV,
  WBTCSupplyMaxLTV,
  WETHSupplyMaxLTV,
} from "@/apis/supplyMaxLTV";
import {
  AAVEMySupplyRatio,
  DAIMySupplyRatio,
  EURSMySupplyRatio,
  LINKMySupplyRatio,
  USDCMySupplyRatio,
  USDTMySupplyRatio,
  WBTCMySupplyRatio,
  WETHMySupplyRatio,
} from "@/apis/supplyRatio";
import {
  AAVESupplyAPY,
  DAISupplyAPY,
  EURSSupplyAPY,
  LINKSupplyAPY,
  USDCSupplyAPY,
  USDTSupplyAPY,
  WBTCSupplyAPY,
  WETHSupplyAPY,
} from "@/apis/supplyAPY";

interface Props {
  allMarket: boolean;
  account: string;
}

const tableRow = [
  "Asset",
  "Total Supplied",
  "APY/LTV",
  "Available",
  "",
  "Supply&Withdraw",
  "Supplied",
];

export default function SupplyTable({ allMarket, account }: Props) {
  const [openSupply, setOpenSupply] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoImg, setCryptoImg] = useState("");
  const [balance, setBalance] = useState("0");
  const [mySupply, setMySupply] = useState("0");
  const [maxLTV, setMaxLTV] = useState("0%");
  const [apy, setAPY] = useState("0%");

  const [daiTotalSupplied, setDaiTotalSupplied] = useState("0");
  const [usdtTotalSupplied, setUsdtTotalSupplied] = useState("0");
  const [usdcTotalSupplied, setUsdcTotalSupplied] = useState("0");
  const [wbtcTotalSupplied, setWbtcTotalSupplied] = useState("0");
  const [linkTotalSupplied, setLinkTotalSupplied] = useState("0");
  const [aaveTotalSupplied, setAaveTotalSupplied] = useState("0");
  const [eursTotalSupplied, setEursTotalSupplied] = useState("0");
  const [wethTotalSupplied, setWethTotalSupplied] = useState("0");

  const [daiMaxLTV, setDaiMaxLTV] = useState("0%");
  const [usdtMaxLTV, setUsdtMaxLTV] = useState("0%");
  const [usdcMaxLTV, setUsdcMaxLTV] = useState("0%");
  const [wbtcMaxLTV, setWbtcMaxLTV] = useState("0%");
  const [linkMaxLTV, setLinkMaxLTV] = useState("0%");
  const [aaveMaxLTV, setAaveMaxLTV] = useState("0%");
  const [eursMaxLTV, setEursMaxLTV] = useState("0%");
  const [wethMaxLTV, setWethMaxLTV] = useState("0%");

  const [daiSupplyRatio, setDaiSupplyRatio] = useState("0%");
  const [usdtSupplyRatio, setUsdtSupplyRatio] = useState("0%");
  const [usdcSupplyRatio, setUsdcSupplyRatio] = useState("0%");
  const [wbtcSupplyRatio, setWbtcSupplyRatio] = useState("0%");
  const [linkSupplyRatio, setLinkSupplyRatio] = useState("0%");
  const [aaveSupplyRatio, setAaveSupplyRatio] = useState("0%");
  const [eursSupplyRatio, setEursSupplyRatio] = useState("0%");
  const [wethSupplyRatio, setWethSupplyRatio] = useState("0%");

  const [daiSupplyAPY, setDaiSupplyAPY] = useState("0%");
  const [usdtSupplyAPY, setUsdtSupplyAPY] = useState("0%");
  const [usdcSupplyAPY, setUsdcSupplyAPY] = useState("0%");
  const [wbtcSupplyAPY, setWbtcSupplyAPY] = useState("0%");
  const [linkSupplyAPY, setLinkSupplyAPY] = useState("0%");
  const [aaveSupplyAPY, setAaveSupplyAPY] = useState("0%");
  const [eursSupplyAPY, setEursSupplyAPY] = useState("0%");
  const [wethSupplyAPY, setWethSupplyAPY] = useState("0%");

  const supply = {
    name: "Supply",
    content: [
      { name: "Wallet Balance", ratio: balance },
      { name: "Amount Supplied", ratio: mySupply },
      { name: "APY", ratio: apy },
      { name: "Max LTV", ratio: maxLTV },
    ],
  };

  const withdraw = {
    name: "Withdraw",
    content: [
      { name: "My Supply", ratio: mySupply },
      { name: "APY", ratio: apy },
    ],
  };

  const tableCol = [
    [
      "ETH.png",
      "DAI",
      daiTotalSupplied,
      daiSupplyAPY,
      daiMaxLTV,
      daiSupplyRatio,
    ],
    [
      "ETH.png",
      "USDT",
      usdtTotalSupplied,
      usdtSupplyAPY,
      usdtMaxLTV,
      usdtSupplyRatio,
    ],
    [
      "usdc.png",
      "USDC",
      usdcTotalSupplied,
      usdcSupplyAPY,
      usdcMaxLTV,
      usdcSupplyRatio,
    ],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
    [
      "wbtc.png",
      "WBTC",
      wbtcTotalSupplied,
      wbtcSupplyAPY,
      wbtcMaxLTV,
      wbtcSupplyRatio,
    ],
    [
      "ETH.png",
      "LINK",
      linkTotalSupplied,
      linkSupplyAPY,
      linkMaxLTV,
      linkSupplyRatio,
    ],
    [
      "ETH.png",
      "AAVE",
      aaveTotalSupplied,
      aaveSupplyAPY,
      aaveMaxLTV,
      aaveSupplyRatio,
    ],
    [
      "ETH.png",
      "EURS",
      eursTotalSupplied,
      eursSupplyAPY,
      eursMaxLTV,
      eursSupplyRatio,
    ],
    [
      "ETH.png",
      "WETH",
      wethTotalSupplied,
      wethSupplyAPY,
      wethMaxLTV,
      wethSupplyRatio,
    ],
  ];

  const checkTotalSupply = async () => {
    DAISupplyTotal().then((item) => setDaiTotalSupplied(item ?? "0"));
    USDTSupplyTotal().then((item) => setUsdtTotalSupplied(item ?? "0"));
    USDCSupplyTotal().then((item) => setUsdcTotalSupplied(item ?? "0"));
    WBTCSupplyTotal().then((item) => setWbtcTotalSupplied(item ?? "0"));
    LINKSupplyTotal().then((item) => setLinkTotalSupplied(item ?? "0"));
    AAVESupplyTotal().then((item) => setAaveTotalSupplied(item ?? "0"));
    EURSSupplyTotal().then((item) => setEursTotalSupplied(item ?? "0"));
    WETHSupplyTotal().then((item) => setWethTotalSupplied(item ?? "0"));
  };

  const checkMaxLTV = async () => {
    DAISupplyMaxLTV().then((item) => setDaiMaxLTV(item ?? "0%"));
    USDTSupplyMaxLTV().then((item) => setUsdtMaxLTV(item ?? "0%"));
    USDCSupplyMaxLTV().then((item) => setUsdcMaxLTV(item ?? "0%"));
    WBTCSupplyMaxLTV().then((item) => setWbtcMaxLTV(item ?? "0%"));
    LINKSupplyMaxLTV().then((item) => setLinkMaxLTV(item ?? "0%"));
    AAVESupplyMaxLTV().then((item) => setAaveMaxLTV(item ?? "0%"));
    EURSSupplyMaxLTV().then((item) => setEursMaxLTV(item ?? "0%"));
    WETHSupplyMaxLTV().then((item) => setWethMaxLTV(item ?? "0%"));
  };

  const checkSupplyRatio = async () => {
    DAIMySupplyRatio(account).then((item) => setDaiSupplyRatio(item ?? "0%"));
    USDTMySupplyRatio(account).then((item) => setUsdtSupplyRatio(item ?? "0%"));
    USDCMySupplyRatio(account).then((item) => setUsdcSupplyRatio(item ?? "0%"));
    WBTCMySupplyRatio(account).then((item) => setWbtcSupplyRatio(item ?? "0%"));
    LINKMySupplyRatio(account).then((item) => setLinkSupplyRatio(item ?? "0%"));
    AAVEMySupplyRatio(account).then((item) => setAaveSupplyRatio(item ?? "0%"));
    EURSMySupplyRatio(account).then((item) => setEursSupplyRatio(item ?? "0%"));
    WETHMySupplyRatio(account).then((item) => setWethSupplyRatio(item ?? "0%"));
  };

  const checkSupplyAPY = async () => {
    DAISupplyAPY().then((item) => setDaiSupplyAPY(item ?? "0%"));
    USDTSupplyAPY().then((item) => setUsdtSupplyAPY(item ?? "0%"));
    USDCSupplyAPY().then((item) => setUsdcSupplyAPY(item ?? "0%"));
    WBTCSupplyAPY().then((item) => setWbtcSupplyAPY(item ?? "0%"));
    LINKSupplyAPY().then((item) => setLinkSupplyAPY(item ?? "0%"));
    AAVESupplyAPY().then((item) => setAaveSupplyAPY(item ?? "0%"));
    EURSSupplyAPY().then((item) => setEursSupplyAPY(item ?? "0%"));
    WETHSupplyAPY().then((item) => setWethSupplyAPY(item ?? "0%"));
  };

  const choiceMaxLTV = (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setMaxLTV(daiMaxLTV);
    } else if (cryptoName === name[1]) {
      setMaxLTV(usdtMaxLTV);
    } else if (cryptoName === name[2]) {
      setMaxLTV(usdcMaxLTV);
    } else if (cryptoName === name[3]) {
      setMaxLTV(wbtcMaxLTV);
    } else if (cryptoName === name[4]) {
      setMaxLTV(linkMaxLTV);
    } else if (cryptoName === name[5]) {
      setMaxLTV(aaveMaxLTV);
    } else if (cryptoName === name[6]) {
      setMaxLTV(eursMaxLTV);
    } else {
      setMaxLTV(wethMaxLTV);
    }
  };

  const choiceAPY = (cryptoName: string) => {
    if (cryptoName === name[0]) {
      setAPY(daiSupplyAPY);
    } else if (cryptoName === name[1]) {
      setAPY(usdtSupplyAPY);
    } else if (cryptoName === name[2]) {
      setAPY(usdcSupplyAPY);
    } else if (cryptoName === name[3]) {
      setAPY(wbtcSupplyAPY);
    } else if (cryptoName === name[4]) {
      setAPY(linkSupplyAPY);
    } else if (cryptoName === name[5]) {
      setAPY(aaveSupplyAPY);
    } else if (cryptoName === name[6]) {
      setAPY(eursSupplyAPY);
    } else {
      setAPY(wethSupplyAPY);
    }
  };

  useEffect(() => {
    if (account) {
      checkTotalSupply();
      checkMaxLTV();
      checkSupplyRatio();
      checkSupplyAPY();
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      choiceMaxLTV(cryptoName);
      choiceAPY(cryptoName);
    }
  }, [cryptoName, account]);

  return (
    <div className="w-full ">
      <table className="table w-full text-center px-20">
        <thead className="">
          <SupplyTableField tableRow={tableRow} />
        </thead>
        <tbody>
          <SupplyTableData
            setMySupply={setMySupply}
            setBalance={setBalance}
            tableCol={tableCol}
            setOpenSupply={setOpenSupply}
            setOpenWithdraw={setOpenWithdraw}
            allMarket={allMarket}
            setCryptoName={setCryptoName}
            setCryptoImg={setCryptoImg}
            account={account}
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
          account={account}
        />
      )}
      {openWithdraw && (
        <Modal
          setOpen={setOpenWithdraw}
          item={withdraw}
          cryptoImg={cryptoImg}
          cryptoName={cryptoName}
          max={mySupply}
          account={account}
        />
      )}
    </div>
  );
}
