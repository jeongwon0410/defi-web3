interface Props {
  tableCol: string[][];
  setOpenBorrow: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRepay: React.Dispatch<React.SetStateAction<boolean>>;
  allMarket: boolean;
  setCryptoImg: React.Dispatch<React.SetStateAction<string>>;
  setCryptoName: React.Dispatch<React.SetStateAction<string>>;
}

export default function BorrowTableData({
  tableCol,
  setOpenBorrow,
  setOpenRepay,
  allMarket,
  setCryptoImg,
  setCryptoName,
}: Props) {
  const handleBorrowClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenBorrow(true);
  };

  const handleRepayClick = (index: number) => {
    setCryptoName(tableCol[index][1]);
    setCryptoImg(tableCol[index][0]);
    setOpenRepay(true);
  };

  return (
    <>
      {tableCol.map((col: string[], index: number) =>
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
              {col[3]}
            </td>
          </tr>
        )
      )}
    </>
  );
}
