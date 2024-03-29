import { ReactNode } from "react";
import useSWR from "swr";
import { getAllAddress } from "@/apis/local";

export default function Table() {
  // TODO: key값 제공
  const { data } = useSWR("", getAllAddress);

  return (
    <div>
      <table className="px-20 text-center">
        <thead>
          <tr>
            <Th>Rank</Th>
            <Th>Address</Th>
            <Th>Deposit Points</Th>
            <Th>Borrow Points</Th>
            <Th>Referral Points</Th>
            <Th>Total Points</Th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item, idx) => (
            <tr key={idx} className="h-[60px] ">
              <Td>{item.rank}</Td>
              <Td>{item.address}</Td>
              <Td>{item.deposit}</Td>
              <Td>{item.borrow}</Td>
              <Td>{item.referral}</Td>
              <Td>{item.total}</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Th = ({ children }: { children: ReactNode }) => (
  <th className=" text-[14px] font-bold leading-[24px] text-[#6A6A6A]">
    {children}
  </th>
);

const Td = ({ children }: { children: ReactNode }) => (
  <td className=" text-[14px] font-bold leading-[20px] text-[#B0B0B0]">
    {children}
  </td>
);
