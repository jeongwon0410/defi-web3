"use client";

import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" mt-20  flex flex-col  items-center justify-center ">
      <div className="font-montserrat text-[30px] font-bold leading-[45px] text-[white]">
        My Account
      </div>
      <div className="mt-10  flex items-center justify-center gap-10">
        {children}
      </div>
    </div>
  );
}
