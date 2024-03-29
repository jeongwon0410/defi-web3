import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useAccountContext } from "@/components/TmpContext";

export default function ConnectButton() {
  const { account, setAccount } = useAccountContext();

  const connect = useCallback(async () => {
    if (window.ethereum === undefined) return;

    const res = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    setAccount(res[0]);
  }, [setAccount]);

  useEffect(() => {
    if (window.ethereum === undefined) return;

    connect();
    window.ethereum.on("accountsChanged", connect);
    return () => window.ethereum.removeListener("accountsChanged", connect);
  }, [connect]);

  return (
    <button
      className="flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem]"
      onClick={connect}
    >
      <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
      <p className="font-montserrat text-[1rem] font-semibold text-[#F6F8FF]">
        {account === null ? "connect wallet" : formatAccount(account)}
      </p>
    </button>
  );
}

const formatAccount = (account: string) =>
  `${account.slice(0, 8)}...${account.slice(-5)}`;
