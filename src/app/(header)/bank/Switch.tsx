"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function Switch({ tab }: { tab: "borrow" | "supply" }) {
  const f = useSwitch();

  return (
    <div className="mx-auto mb-5 flex gap-10">
      <SwitchButton onClick={() => f("supply")} selected={tab === "supply"}>
        Supply
      </SwitchButton>
      <SwitchButton onClick={() => f("borrow")} selected={tab === "borrow"}>
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

const useSwitch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (tab: "supply" | "borrow") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(pathname + "?" + params.toString());
  };
};
