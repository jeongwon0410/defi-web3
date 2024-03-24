import { useEffect, useState } from "react";
import Account from "./Account";
import Borrow from "./Borrow";
import Supply from "./Supply";
import Table from "./Table";
import { useMutation } from "react-query";
import saveAddress from "@/apis/saveAddress";
import { useAtom } from "jotai";
import { addressAtom } from "@/datas/address";

export default function AccountMain() {
  const [address, setAddress] = useState("");
  const [account] = useAtom(addressAtom);
  useEffect(() => {
    if (account) {
      setAddress(account);
      save.mutate(account || "");
    }
  }, [account]);

  const save = useMutation({
    mutationFn: saveAddress,
  });

  return (
    <div className=" justify-center  items-center flex  flex-col mt-20 ">
      <div className="font-montserrat  font-bold text-[30px] leading-[45px] text-[white]">
        My Account
      </div>
      <div className="flex  gap-10 justify-center items-center mt-10">
        <div className="w-[510px]">
          {address && <Supply account={address} />}
        </div>
        <div className="w-[510px]">
          {address && <Borrow account={address} />}
        </div>
      </div>
    </div>
  );
}
