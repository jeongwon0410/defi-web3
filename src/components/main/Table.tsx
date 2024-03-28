import Image from "next/image";
import { ReactNode } from "react";

export const IconTd = ({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) => (
  <td>
    <div className="flex justify-center ">
      <Image src={src} className="mr-3" height={28} width={28} alt="" />
      <div className="mt-1  text-[14px] font-semibold leading-[20px] text-[#B0B0B0] ">
        {children}
      </div>
    </div>
  </td>
);

export const Td = ({ children }: { children: ReactNode }) => (
  <td className="text-[14px] font-normal leading-[24px] text-[#B0B0B0] ">
    {children}
  </td>
);

export const Divider = () => (
  <td>
    <div className="h-[20px] w-[2px] bg-[#252423]" />
  </td>
);

export const Button = ({
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
