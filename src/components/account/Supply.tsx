import { useEffect, useState } from "react";
import Account from "./Account";
import Table from "./Table";
import {
  AAVEMySupplyBalance,
  DAIMySupplyBalance,
  EURSMySupplyBalance,
  LINKMySupplyBalance,
  USDCMySupplyBalance,
  USDTMySupplyBalance,
  WBTCMySupplyBalance,
  WETHMySupplyBalance,
} from "@/apis/mySupplyBalance";
import { DAISupplyAPY } from "@/apis/supplyAPY";

interface Props {
  account: string;
}
export default function Supply({ account }: Props) {
  const [balance, setBalance] = useState(0);

  const tableCol = [
    ["ETH.png", "DAI", 0, 0, 0],
    ["ETH.png", "USDT", 0, 0, 0],
    ["usdc.png", "USDC", 0, 0, 0],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
  ];
  useEffect(() => {
    if (account) {
      checkMySupply(account);
    }
  }, []);

  const checkMySupply = async (account: string) => {
    const dai = await DAIMySupplyBalance(account);
    const usdt = await USDTMySupplyBalance(account);
    const usdc = await USDCMySupplyBalance(account);
    const wbtc = await WBTCMySupplyBalance(account);
    const link = await LINKMySupplyBalance(account);
    const aave = await AAVEMySupplyBalance(account);
    const eurs = await EURSMySupplyBalance(account);
    const weth = await WETHMySupplyBalance(account);

    const result =
      parseFloat(dai) +
      parseFloat(usdt) +
      parseFloat(usdc) +
      parseFloat(wbtc) +
      parseFloat(link) +
      parseFloat(aave) +
      parseFloat(eurs) +
      parseFloat(weth);

    setBalance(result);
  };
  return (
    <div className="overflow-hidden rounded-lg w-full max-w-lg">
      <div className="bg-gradient-to-r from-[#83AD82]/[28%] via-[#83AD82]/[9%] to-[#FFFFFF]/[1%] px-4 pt-5 pb-7">
        <div className="flex justify-between ">
          <div className="font-montserrat text-[18px] leading-[20px] text-[#CDD9C9]">
            Supply
          </div>
          <div className="font-pretendard text-[18px] leading-[20px] text-[#B0B0B0]">
            Balance : ${balance}
          </div>
        </div>
      </div>
      <Account>
        <Table tableCol={tableCol} />
      </Account>
    </div>
  );
}
