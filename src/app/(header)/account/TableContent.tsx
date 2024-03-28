import Image from "next/image";
import { ReactNode } from "react";

export type TableContentProps = {
  header: string[];
  content: TableRow[];
};

export type TableRow = {
  imageURL: string;
  title: string;
  content: string[];
};

export default function TableContent({ header, content }: TableContentProps) {
  return (
    <div className="relative rounded-lg border border-white bg-[#151515] px-6 py-8 ">
      <table className="text-center">
        <Thead row={header} />
        <tbody>
          {content.map((item, idx: number) => (
            <tr className="h-[60px]" key={idx}>
              <Td className="flex">
                <Image
                  src={item.imageURL}
                  className="mr-2 mt-1"
                  height={15}
                  width={15}
                  alt=""
                />
                <div className="flex ">{item.title}</div>
              </Td>

              {item.content.map((val, idx) => (
                <Td key={idx}>{val}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Thead = ({ row }: { row: string[] }) => (
  <thead>
    <tr>
      {row.map((item: string, index: number) => (
        <th key={index} className="  text-[14px] leading-[20x] text-[#B0B0B0]">
          {item}
        </th>
      ))}
    </tr>
  </thead>
);

const Td = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <td className={`text-[14px] leading-[20px] text-[#B0B0B0] ${className}`}>
    {children}
  </td>
);
