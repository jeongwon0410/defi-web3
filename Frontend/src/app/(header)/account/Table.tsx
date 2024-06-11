import { ReactNode } from "react";

export const Table = ({
  title,
  balance,
  header,
  children,
}: {
  title: string;
  balance: ReactNode;
  header: string[];
  children: ReactNode;
}) => (
  <div className="flex w-[40%] min-w-[600px] flex-col rounded-lg bg-[linear-gradient(98deg,rgba(131,173,130,0.28)_3.4%,rgba(255,255,255,0.00)_51.09%,rgba(131,173,130,0.09)_93.74%)] shadow-[0_0_36px_0_rgba(129,189,124,0.05)]">
    <Header title={title} balance={balance} />

    <div className="flex flex-col items-stretch rounded-lg bg-[#151515] px-[2.05rem] py-[2.25rem]">
      <div className="flex justify-around text-center text-[0.9rem] font-semibold text-[#B0B0B0]">
        {header.map((title, idx) => (
          <p key={idx} className="flex-1">
            {title}
          </p>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  </div>
);

const Header = ({ title, balance }: { title: string; balance: ReactNode }) => (
  <div className="relative flex justify-between  px-[3.37rem] pb-[1.4rem] pt-[1.8rem]">
    <h3 className="inline-block bg-gradient-to-r from-[rgba(205,217,201,1)] to-[rgba(180,255,155,1)] bg-clip-text font-montserrat text-[1rem] font-semibold text-transparent">
      {title}
    </h3>
    <p className="text-[1rem] font-medium text-[#B0B0B0]">Balance ${balance}</p>
  </div>
);

export const Label = ({ children }: { children: ReactNode }) => {
  return (
    <p className="flex-1 text-center text-[0.9rem] font-normal text-[#B0B0B0]">
      {children}
    </p>
  );
};
