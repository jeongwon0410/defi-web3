import { ReactNode } from "react";
import { Tab } from "@/app/(header)/bank/page";

interface Props {
  tab: Tab;
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Switch({ tab, setTab, setExpanded }: Props) {
  const clickSupply = () => {
    setTab("supply");
    setExpanded(false);
  };

  const clickBorrow = () => {
    setTab("borrow");
    setExpanded(false);
  };

  return (
    <div className="mx-auto mb-5 flex gap-10">
      <SwitchButton onClick={clickSupply} selected={tab === "supply"}>
        Supply
      </SwitchButton>
      <SwitchButton onClick={clickBorrow} selected={tab === "borrow"}>
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
