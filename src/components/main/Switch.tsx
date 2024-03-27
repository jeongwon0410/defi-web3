import { Tab } from "./Main";

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
      <button
        className={`mr-10  font-montserrat text-[30px] font-bold leading-[45px] ${
          tab === "supply" ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
        }`}
        onClick={clickSupply}
      >
        Supply
      </button>
      <button
        className={`mr-10  font-montserrat text-[30px] font-bold leading-[45px] ${
          tab === "borrow" ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
        }`}
        onClick={clickBorrow}
      >
        Borrow
      </button>
    </div>
  );
}
