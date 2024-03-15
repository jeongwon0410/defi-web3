import { name } from "@/pages/api/common";
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
  AAVEMySupplyBalance,
  DAIMySupplyBalance,
  EURSMySupplyBalance,
  LINKMySupplyBalance,
  USDCMySupplyBalance,
  USDTMySupplyBalance,
  WBTCMySupplyBalance,
  WETHMySupplyBalance,
} from "@/pages/api/MySupplyBalance";
interface Props {
  tableCol: string[][];
  setOpenSupply: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  allMarket: boolean;
  setCryptoImg: React.Dispatch<React.SetStateAction<string>>;
  setCryptoName: React.Dispatch<React.SetStateAction<string>>;
  setMySupply: React.Dispatch<React.SetStateAction<string>>;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
}

export default function SupplyTableData({
  tableCol,
  setOpenSupply,
  setOpenWithdraw,
  allMarket,
  setCryptoImg,
  setCryptoName,
  setMySupply,
  setBalance,
}: Props) {
  const handleSupplyClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenSupply(true);
    checkSupply(tableCol[index][1]);
    checkBalance(tableCol[index][1]);
  };

  const handleWithdrawClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenWithdraw(true);
    checkSupply(tableCol[index][1]);
  };

  const checkSupply = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[1]) {
      USDTMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    } else {
      WETHMySupplyBalance().then((item) => setMySupply(item ?? "0"));
    }
  };

  const checkBalance = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[1]) {
      USDTBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSBalance().then((item) => setBalance(item ?? "0"));
    } else {
      WETHBalance().then((item) => setBalance(item ?? "0"));
    }
  };
  return (
    <>
      {tableCol &&
        tableCol.map((col: string[], index: number) =>
          !allMarket && index > 3 ? null : (
            <tr key={index} className="h-[74px] column">
              <td>
                <div className="flex justify-center ">
                  <img src={col[0]} className="h-[28px] w-[28px] mr-3" />
                  <div className="font-pretendard font-semibold text-[14px] leading-[20px] text-[#B0B0B0] mt-1 ">
                    {col[1]}
                  </div>
                </div>
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[2]}
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[3]}
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[4]}
              </td>
              <td>
                <div className=" bg-[#252423] h-[20px] w-[2px]" />
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#3E4064] w-[350px]">
                <div className="flex justify-center">
                  <button
                    className="items-center py-2 px-8 rounded-lg  bg-[#2F8128] mr-4 text-[#E1E3EA] "
                    onClick={() => handleSupplyClick(index)}
                  >
                    Supply
                  </button>
                  <button
                    className="items-center py-2 px-5 rounded-lg bg-[#262626] text-[#818A80]"
                    onClick={() => handleWithdrawClick(index)}
                  >
                    Withdraw
                  </button>
                </div>
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[5]}
              </td>
            </tr>
          )
        )}
    </>
  );
}
