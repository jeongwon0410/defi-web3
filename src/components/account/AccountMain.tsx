import { useEffect, useState } from "react";
import Account from "./Account";
import Borrow from "./Borrow";
import Supply from "./Supply";
import Table from "./Table";

interface Props {
  account: string;
}
export default function AccountMain({ account }: Props) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (account) {
      setAddress(account);
    } else {
      setAddress(localStorage.getItem("account") || "");
    }
  }, [account]);
  return (
    <div className=" justify-center  items-center flex  flex-col mt-20 ">
      <div className="font-montserrat  font-bold text-[30px] leading-[45px] text-[white]">
        My Account
      </div>
      <div className="flex  gap-10 justify-center items-center mt-10">
        <div className="w-[500px] ">
          {address && <Supply account={address} />}
        </div>
        <div className="w-[500px] ">
          {address && <Borrow account={address} />}
        </div>
      </div>
    </div>
  );
}
