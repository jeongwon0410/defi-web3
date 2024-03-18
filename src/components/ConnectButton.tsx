import { useEffect, useState } from "react";

export default function ConnectButton() {
  return (
    <div className="relative">
      <button className="items-center py-2 px-5 rounded-full bg-[#252a39] mr-4">
        <div className="flex text-white  font-montserrat  font-semibold text-[16px] leading-[24px]">
          <img src="metamask.png" className="h-4 w-4 mt-1 mr-2" />
          {localStorage.getItem("account")}
        </div>
      </button>
    </div>
  );
}
