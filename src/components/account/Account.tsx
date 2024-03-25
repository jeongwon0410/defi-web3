import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Account({ children }: Props) {
  return (
    <div className="relative -top-3 bg-[#151515] rounded-lg w-full max-w-lg border border-white">
      <div className=" w-full max-w-lg flex justify-between px-6 py-8 ">
        <div className="flex flex-col w-full ">{children}</div>
      </div>
    </div>
  );
}
