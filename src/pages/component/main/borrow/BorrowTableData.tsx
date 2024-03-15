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
  AAVEBorrowableAmount,
  DAIBorrowableAmount,
  EURSBorrowableAmount,
  LINKBorrowableAmount,
  USDCBorrowableAmount,
  USDTBorrowableAmount,
  WBTCBorrowableAmount,
  WETHBorrowableAmount,
} from "@/pages/api/borrowaleAmount";
import {
  AAVEBorrowAmount,
  DAIBorrowAmount,
  EURSBorrowAmount,
  LINKBorrowAmount,
  USDCBorrowAmount,
  USDTBorrowAmount,
  WBTCBorrowAmount,
  WETHBorrowAmount,
} from "@/pages/api/borrowAmount";
interface Props {
  tableCol: string[][];
  setOpenBorrow: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRepay: React.Dispatch<React.SetStateAction<boolean>>;
  allMarket: boolean;
  setCryptoImg: React.Dispatch<React.SetStateAction<string>>;
  setCryptoName: React.Dispatch<React.SetStateAction<string>>;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  setBorrowAmount: React.Dispatch<React.SetStateAction<string>>;
  setBorrowableAmount: React.Dispatch<React.SetStateAction<string>>;
}

export default function BorrowTableData({
  tableCol,
  setOpenBorrow,
  setOpenRepay,
  allMarket,
  setCryptoImg,
  setCryptoName,
  setBalance,
  setBorrowAmount,
  setBorrowableAmount,
}: Props) {
  const handleBorrowClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenBorrow(true);
    checkBalance(tableCol[index][1]);
    checkBorrowableAmount(tableCol[index][1]);
  };

  const handleRepayClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenRepay(true);
    checkBorrowAmount(tableCol[index][1]);
  };

  const checkBalance = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIBalance().then((item) => setBalance(item ?? "0"));
    } else if (cryptoName === name[1]) {
      USDTBalance().then((item) => setBalance(item ?? " 0"));
    } else if (cryptoName === name[2]) {
      USDCBalance().then((item) => setBalance(item ?? " 0"));
    } else if (cryptoName === name[3]) {
      WBTCBalance().then((item) => setBalance(item ?? " 0"));
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

  const checkBorrowableAmount = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIBorrowableAmount().then((item) => setBorrowableAmount(item ?? " 0"));
    } else if (cryptoName === name[1]) {
      USDTBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    } else {
      WETHBorrowableAmount().then((item) => setBorrowableAmount(item ?? "0"));
    }
  };

  const checkBorrowAmount = async (cryptoName: string) => {
    if (cryptoName === name[0]) {
      DAIBorrowAmount().then((item) => setBorrowAmount(item ?? " 0"));
    } else if (cryptoName === name[1]) {
      USDTBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[2]) {
      USDCBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[3]) {
      WBTCBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[4]) {
      LINKBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[5]) {
      AAVEBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    } else if (cryptoName === name[6]) {
      EURSBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    } else {
      WETHBorrowAmount().then((item) => setBorrowAmount(item ?? "0"));
    }
  };

  return (
    <>
      {tableCol &&
        tableCol.map((col: string[], index: number) =>
          !allMarket && index > 3 ? null : (
            <tr key={index} className="h-[74px] column">
              <td>
                <div className="flex justify-center">
                  <img src={col[0]} className="h-[28px] w-[28px] mr-3" />
                  <div className="font-pretendard font-semibold text-[14px] leading-[20px] text-[#B0B0B0] mt-1">
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

              <td>
                <div className=" bg-[#252423] h-[20px] w-[2px]" />
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#3E4064] w-[350px]">
                <div className="flex justify-center">
                  <button
                    className="items-center py-2 px-5 rounded-lg  bg-[#2F8128] mr-4 text-[#E1E3EA] "
                    onClick={() => handleBorrowClick(index)}
                  >
                    Borrow
                  </button>
                  <button
                    className="items-center py-2 px-5 rounded-lg bg-[#262626] text-[#818A80]"
                    onClick={() => handleRepayClick(index)}
                  >
                    Repay
                  </button>
                </div>
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[4]}
              </td>
            </tr>
          )
        )}
    </>
  );
}
