import getAllAddress from "@/apis/getAllAddress";
import { useQuery } from "react-query";

export default function Table() {
  const tableCol = [
    ["ETH.png", "DAI", 0, 0, 0],
    ["ETH.png", "USDT", 0, 0, 0],
    ["usdc.png", "USDC", 0, 0, 0],
    // ["eth.png", "ETH", "0.000", "0.00%", "0.00%", "00.00"],
  ];

  return (
    <div className="w-full">
      <table className="table w-full text-center">
        <thead className="">
          <tr>
            <th className="font-pretendard font-bold text-[14px] leading-[24px] text-[#6A6A6A]">
              Asset
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              Supplied
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              APY
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              Max LTV
            </th>
          </tr>
        </thead>
        <tbody>
          {tableCol.map((item: any, index: number) => (
            <tr className="h-[60px] w-full rewardColum " key={index}>
              <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                <div className="flex item-center justify-center">
                  <img src={item[0]} className="h-[28px] w-[28px] mr-3" />
                  {item[1]}
                </div>
              </td>
              <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                {item[2]}
              </td>
              <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                {item[3]}
              </td>
              <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                {item[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
