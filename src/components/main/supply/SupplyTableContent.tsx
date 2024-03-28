import { ReactNode } from "react";
import Image from "next/image";
import { SupplyTableCol } from "./SupplyTable";
import { normalize } from "@/util/bignumber";

interface Props {
  cols: SupplyTableCol[];
  expanded: boolean;
}

const PREVIEW_CNT = 4;

export default function SupplyTableContent({ cols, expanded }: Props) {
  // const choiceMax = async (cryptoName: string, account: string) => {
  //     DAIMaxAmount(account).then((item) => setMax(item ?? "0"));
  // };

  const handleSupplyClick = (idx: number) => {
    idx;
    // choiceMax(tableCol[index][1], account);
  };

  const handleWithdrawClick = (idx: number) => {
    // TODO
    idx;
  };

  return (
    <tbody>
      {(expanded ? cols : cols.slice(0, PREVIEW_CNT)).map((col, idx) => (
        <Tr
          key={idx}
          col={col}
          onSupply={() => handleSupplyClick(idx)}
          onWithdraw={() => handleWithdrawClick(idx)}
        />
      ))}
    </tbody>
  );
}

const Tr = ({
  col,
  onSupply,
  onWithdraw,
}: {
  col: SupplyTableCol;
  onSupply: () => void;
  onWithdraw: () => void;
}) => {
  const RAY_DECIMALS = 27;
  const formattedApy =
    (parseFloat(normalize(col.apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  const formattedLtv =
    parseFloat(col.ltv.dividedBy(100).toString()).toFixed(2) + "%";

  const formattedBalance =
    "$" +
    col.balance
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  const formattedSupply = col.supply.toFixed(18);

  return (
    <tr className="h-[74px]">
      {/* TODO: slash 없애기 */}
      <IconTd src={col.imageURL}>{col.title}</IconTd>

      <Td>{col.totalSupplied.toString()}</Td>
      <Td>{`${formattedApy}/${formattedLtv}`}</Td>
      <Td>{formattedBalance}</Td>

      <Divider />

      <td className="w-[350px] text-[14px] font-normal leading-[24px]">
        <div className="flex justify-center gap-4">
          <Button className="bg-[#2F8128] text-[#E1E3EA]" onClick={onSupply}>
            Supply
          </Button>
          <Button className="bg-[#262626] text-[#818A80]" onClick={onWithdraw}>
            Withdraw
          </Button>
        </div>
      </td>

      <Td>{formattedSupply}</Td>
    </tr>
  );
};

const IconTd = ({ src, children }: { src: string; children: ReactNode }) => (
  <td>
    <div className="flex justify-center ">
      <Image src={src} className="mr-3" height={28} width={28} alt="" />
      <div className="mt-1  text-[14px] font-semibold leading-[20px] text-[#B0B0B0] ">
        {children}
      </div>
    </div>
  </td>
);

const Td = ({ children }: { children: ReactNode }) => (
  <td className="text-[14px] font-normal leading-[24px] text-[#B0B0B0] ">
    {children}
  </td>
);

const Divider = () => (
  <td>
    <div className="h-[20px] w-[2px] bg-[#252423]" />
  </td>
);

const Button = ({
  className,
  onClick,
  children,
}: {
  className: string;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    className={`items-center rounded-lg px-5 py-2 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
