import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useTmpContext } from "@/components/TmpContext";

export default function ConnectButton() {
  const { address, setAddress } = useTmpContext();
  // const save = useMutation({ mutationFn: saveAddress });

  const connect = useCallback(async () => {
    if (window.ethereum === undefined) return;

    const res = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    setAddress(res[0]);
    // save.mutate(res[0]);
  }, [setAddress]);

  useEffect(() => {
    if (window.ethereum === undefined) return;

    connect();
    window.ethereum.on("accountsChanged", connect);
    return () => window.ethereum.removeListener("accountsChanged", connect);
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
          {address === null ? "connect wallet" : address}
        </div>
      </button>
    </div>
  );
}
