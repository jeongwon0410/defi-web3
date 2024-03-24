import saveAddress from "@/apis/saveAddress";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { MetaMaskSDK } from "@metamask/sdk";
import { useAtom } from "jotai";
import { addressAtom } from "@/datas/address";

export default function ConnectButton() {
  const [address, setAddress] = useState("");
  const [account, setAccount] = useAtom(addressAtom);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      window.ethereum.on("accountsChanged", connect);
      window.ethereum.on("chainChanged", chainChanged);
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      connect();
    }
  }, []);

  const chainChanged = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      setAddress("");
    }
  };

  const connect = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        const res: any = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAddress(res[0]);
        setAccount(res[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Install Metamask");
    }
  };
  return (
    <div className="relative">
      <button
        className="items-center py-2 px-5 rounded-full bg-[#252a39] mr-4"
        onClick={connect}
      >
        <div className="flex text-white  font-montserrat  font-semibold text-[16px] leading-[24px]">
          <img src="metamask.png" className="h-4 w-4 mt-1 mr-2" />
          {address === "" ? "connect wallet" : address}
        </div>
      </button>
    </div>
  );
}
