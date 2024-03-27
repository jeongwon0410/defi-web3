import { ReactNode } from "react";
import { Tab } from "@/app/(header)/bank/page";

interface Props {
  tab: Tab;
  setTab: React.Dispatch<React.SetStateAction<Tab>>;
  setAllMarket: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Switch({ tab, setTab, setAllMarket }: Props) {
  const clickSupply = () => {
    setTab("supply");
    setAllMarket(false);
  };

  const clickBorrow = () => {
    setTab("borrow");
    setAllMarket(false);
  };

  return (
    <div className="mx-auto mb-5 flex flex-wrap">
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
      className={`mr-10  font-montserrat text-[30px] font-bold leading-[45px] ${
        selected ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
