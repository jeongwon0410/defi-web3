"use client";

import { ReactNode } from "react";
import { Tab } from "@/contracts/type";

export default function Switch({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
}) {
  return (
    <div className="mx-auto mb-5 flex gap-10">
      <SwitchButton
        onClick={() => setTab("supply")}
        selected={tab === "supply"}
      >
        Supply
      </SwitchButton>
      <SwitchButton
        onClick={() => setTab("borrow")}
        selected={tab === "borrow"}
      >
        Borrow
      </SwitchButton>
    </div>
  );
}

const SwitchButton = ({
  onClick,
  selected,
  children,
}: {
  onClick: () => void;
  selected: boolean;
  children: ReactNode;
}) => {
  return (
    <button
      className={`font-montserrat text-[1.625rem] font-bold ${
        selected ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
