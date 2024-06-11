import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-[3.56rem] font-montserrat text-[1.625rem] font-bold text-[white]">
        My Account
      </h2>
      {children}
    </div>
  );
}
