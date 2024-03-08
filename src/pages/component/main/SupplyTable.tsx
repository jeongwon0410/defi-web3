import { useState } from "react";
import Modal from "../modal/Modal";

interface Props {
  tableRow: String[];
  tableCol: String[][];
}
export default function SupplyTable({ tableRow, tableCol }: Props) {
  const [open, setOpen] = useState(false);
  console.log(tableCol[1]);
  return (
    <div className="w-full ">
      <table className="table w-full text-center px-20">
        <thead className="">
          <tr>
            {tableRow.map((item, index) => (
              <th
                key={index}
                className={
                  index === 5
                    ? `font-pretendard font-semibold text-[14px] leading-[20px] text-[#559465]`
                    : `font-pretendard font-semibold text-[14px] leading-[20px] text-[#525C52]`
                }
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableCol.map((col, index) => (
            <tr key={index} className="h-[74px] column">
              <td>
                <div className="flex justify-center">
                  <img src="ETH.png" className="h-[28px] w-[28px] mr-3" />
                  <div className="font-pretendard font-semibold text-[14px] leading-[20px] text-[#B0B0B0] mt-1">
                    {col[0]}
                  </div>
                </div>
              </td>
              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[1]}
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
                    className="items-center py-2 px-8 rounded-lg  bg-[#2F8128] mr-4 text-[#E1E3EA] "
                    onClick={() => setOpen(true)}
                  >
                    Supply
                  </button>
                  <button className="items-center py-2 px-5 rounded-lg bg-[#262626] text-[#818A80]">
                    Withdraw
                  </button>
                </div>
              </td>

              <td className="font-pretendard font-normal text-[14px] leading-[24px] text-[#B0B0B0] ">
                {col[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && <Modal setOpen={setOpen} />}
    </div>
  );
}
