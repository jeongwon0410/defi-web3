interface Props {
  tableCol: string[][];
  setOpenSupply: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  allMarket: boolean;
  setCryptoImg: React.Dispatch<React.SetStateAction<string>>;
  setCryptoName: React.Dispatch<React.SetStateAction<string>>;
}

export default function SupplyTableData({
  tableCol,
  setOpenSupply,
  setOpenWithdraw,
  allMarket,
  setCryptoImg,
  setCryptoName,
}: Props) {
  const handleSupplyClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenSupply(true);
  };

  const handleWithdrawClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenWithdraw(true);
  };
  return (
    <>
      {tableCol.map((col, index) =>
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
              {col[4]}
            </td>
          </tr>
        )
      )}
    </>
  );
}
