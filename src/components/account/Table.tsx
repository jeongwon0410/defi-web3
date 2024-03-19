import getAllAddress from "@/apis/getAllAddress";
import { useQuery } from "react-query";

interface Props {
  tableCol: Array<any>;
}
export default function Table({ tableCol }: Props) {
  return (
    <div className="w-full">
      <table className="table w-full text-center">
        <thead className="">
          <tr>
            <th className="font-pretendard  text-[14px] leading-[20x] text-[#B0B0B0]">
              Asset
            </th>
            <th className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
              Supplied
            </th>
            <th className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
              APY
            </th>
            <th className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
              Max LTV
            </th>
          </tr>
        </thead>
        <tbody>
          {tableCol.map((item: any, index: number) => (
            <tr className="h-[60px] w-full rewardColum " key={index}>
              <td className="font-pretendard text-[14px] leading-[20px] text-[#B0B0B0]">
                <div className="flex item-center justify-center">
                  <img src={item[0]} className="h-[28px] w-[28px] mr-3" />
                  {item[1]}
                </div>
              </td>
              <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                {item[2]}
              </td>
              <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                {item[3]}
              </td>
              <td className="font-pretendard  text-[14px] leading-[20px] text-[#B0B0B0]">
                {item[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
