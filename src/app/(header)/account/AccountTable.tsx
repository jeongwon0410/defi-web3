import Image from "next/image";
import { ReactNode } from "react";

export default function AccountTable({
  header,
  children,
}: {
  header: string[];
  children: ReactNode;
}) {
  return (
    <div className="rounded-[0.78rem] bg-[#151515] px-[2.45rem] py-[2.25rem] shadow-[0_0_36px_0_rgba(129,189,124,0.05)]">
      <table className="w-full border-separate border-spacing-y-[0.45rem] text-center">
        <AccountTh row={header} />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const AccountTh = ({ row }: { row: string[] }) => (
  <thead>
    <tr>
      {row.map((item: string, index: number) => (
        <th key={index} className=" text-[0.73125rem] text-[#B0B0B0]">
          {item}
        </th>
      ))}
    </tr>
  </thead>
);

export const AccountTr = ({ children }: { children: ReactNode }) => {
  return <tr className="h-[4.16rem] bg-[#1B1C1B]">{children}</tr>;
};

export const AccountTd = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <td
      className={`px-4 text-[0.7875rem] font-normal text-[#B0B0B0] first:rounded-l-[0.75rem]  last:rounded-r-[0.75rem] ${className}`}
    >
      {children}
    </td>
  );
};

export const AccountIconTd = ({
  src,
  title,
}: {
  src: string;
  title: string;
}) => (
  <AccountTd>
    <div className="flex items-center gap-2 pl-4 font-semibold">
      <Image src={src} className="object-cover" height={25} width={25} alt="" />
      {title}
    </div>
  </AccountTd>
);
