import saveAddress from "@/apis/saveAddress";
import { useSDK } from "@metamask/sdk-react";
import { useEffect, useState } from "react";
import { useMutation, useQueries, useQuery } from "react-query";

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}
export default function ConnectWalletButton({ setAccount }: Props) {
  const { sdk, connected, connecting, account } = useSDK();

  // const data = useQuery({
  //   queryKey: ["getAddress"],
  //   queryFn: () => getAddress(localStorage.getItem("account") || ""),
  // });

  const save = useMutation({
    mutationFn: saveAddress,
  });

  useEffect(() => {
    if (connected) {
      localStorage.setItem("account", account || "");
      setAccount(account || "");

      save.mutate(account || "");
    }
  }, [connected, account]);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setAccount("");
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <button
          className="items-center py-2 px-5 rounded-full bg-[#252a39] mr-4"
          // onClick={disconnect}
        >
          <div className="flex text-white  font-montserrat  font-semibold text-[16px] leading-[24px]">
            <img src="metamask.png" className="h-4 w-4 mt-1 mr-2" />
            {account}
          </div>
        </button>
      ) : (
        <button
          className="items-center py-2 px-5 rounded-full bg-[#252a39] mr-4"
          disabled={connecting}
          onClick={connect}
        >
          <div className="flex text-white  font-montserrat  font-semibold text-[16px] leading-[24px]">
            <img src="metamask.png" className="h-4 w-4 mt-1 mr-2" />
          </div>
        </button>
      )}
    </div>
  );
}
