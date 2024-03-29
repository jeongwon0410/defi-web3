import Image from "next/image";
import { ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table className="mt-[-0.68rem] table w-full border-separate border-spacing-y-[0.68rem] px-20 text-center">
      {children}
    </table>
  );
};

export const Tr = ({ children }: { children: ReactNode }) => {
  return (
    <tr className="bg-[#151515] shadow-[0_0_17.73px_0_rgba(129,189,124,0.14)]">
      {children}
    </tr>
  );
};

export const IconTd = ({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) => (
  <Td>
    <div className="ml-6 flex items-center justify-start gap-2">
      <Image
        src={src}
        height={25}
        width={25}
        alt=""
        className="object-contain"
      />
      <div className="text-[0.8125rem] font-semibold leading-[20px] text-[#B0B0B0]">
        {children}
      </div>
    </div>
  </Td>
);

export const Td = ({ children }: { children?: ReactNode }) => (
  <td className="h-[4.125rem] border-y border-[#49824F] text-[0.8125rem] font-normal text-[#B0B0B0] first:rounded-l-[0.75rem] first:border-l last:rounded-r-[0.75rem] last:border-r">
    {children}
  </td>
);

export const Divider = () => (
  <Td>
    <div className="h-[20px] w-[2px] bg-[#252423]" />
  </Td>
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
    className={`items-center rounded-[0.3375rem] px-[1.46rem] py-[0.62rem] ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
