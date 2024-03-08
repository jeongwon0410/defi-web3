import { useState } from "react";

interface Props {
  supply: boolean;
  borrow: boolean;
  setSupply: React.Dispatch<React.SetStateAction<boolean>>;
  setBorrow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Switch({
  supply,
  borrow,
  setSupply,
  setBorrow,
}: Props) {
  const clickSupply = () => {
    setSupply(true);
    setBorrow(false);
  };

  const clickBorrow = () => {
    setSupply(false);
    setBorrow(true);
  };

  return (
    <div className="flex mx-auto flex-wrap mb-5">
      <button
        className={`font-montserrat  font-bold text-[30px] leading-[45px] mr-10 ${
          supply === true ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
        }`}
        onClick={clickSupply}
      >
        Supply
      </button>
      <button
        className={`font-montserrat  font-bold text-[30px] leading-[45px] mr-10 ${
          borrow === true ? "text-[#F6FFF9]" : "text-[#F6FFF9]/20"
        }`}
        onClick={clickBorrow}
      >
        Borrow
      </button>
    </div>
  );
}
