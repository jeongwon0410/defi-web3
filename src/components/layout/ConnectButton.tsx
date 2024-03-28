import { useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import Image from "next/image";
import { useTmpContext } from "@/components/TmpContext";
import saveAddress from "@/apis/saveAddress";

export default function ConnectButton() {
  const { address, setAddress } = useTmpContext();
  const save = useMutation({ mutationFn: saveAddress });

  const connect = useCallback(async () => {
    if (window.ethereum === undefined) return;

    const res = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    setAddress(res[0]);
    save.mutate(res[0]);
  }, [save, setAddress]);

  useEffect(() => {
    if (window.ethereum === undefined) return;
    window.ethereum.on("accountsChanged", connect);
  }, [connect]);

  return (
    <div className="relative">
      <button
        className="mr-4 items-center rounded-full bg-[#252a39] px-5 py-2"
        onClick={connect}
      >
        <div className="flex font-montserrat  text-[16px]  font-semibold leading-[24px] text-white">
          <Image
            src="/metamask.png"
            alt=""
            className="mr-2 mt-1"
            height={16}
            width={16}
          />
          {address === "" ? "connect wallet" : address}
        </div>
      </button>
    </div>
  );
}
