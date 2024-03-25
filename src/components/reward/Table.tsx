import getAllAddress from "@/apis/getAllAddress";
import { useQuery } from "react-query";

export default function Table() {
  const data = useQuery({
    queryKey: ["getAllAddress"],
    queryFn: getAllAddress,
  });

  return (
    <div className="w-full  ">
      <table className="table w-full text-center px-20">
        <thead className="">
          <tr>
            <th className="font-pretendard font-bold text-[14px] leading-[24px] text-[#6A6A6A]">
              Rank
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
              Address
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              Deposit Points
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              Borrow Points
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              Referral Points
            </th>
            <th className="font-pretendard font-bold text-[14px] leading-[20px] text-[#6A6A6A]">
              Total Points
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item: any, index: number) =>
            item.address === "" ? null : (
              <tr key={index} className="h-[60px] rewardColum ">
                <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                  {item.rank}
                </td>
                <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#E1E3EA]">
                  {item.address}
                </td>
                <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                  {item.deposit}
                </td>
                <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                  {item.borrow}
                </td>
                <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                  {item.referral}
                </td>
                <td className="font-pretendard font-bold text-[14px] leading-[20px] text-[#B0B0B0]">
                  {item.total}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
