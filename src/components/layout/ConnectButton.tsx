import Image from "next/image";
import Link from "next/link";
import { useMetaMask } from "@/util/useMetaMask";

// Reference: https://docs.metamask.io/wallet/reference/provider-api/
export default function ConnectButton() {
  const { wallet, hasProvider, connectMetaMask } = useMetaMask();

  if (!hasProvider)
    return (
      <Link href="https://metamask.io" target="_blank" className={STYLE}>
        <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
        Install Metamask
      </Link>
    );

  if (window.ethereum?.isMetaMask && wallet.accounts.length < 1) {
    return (
      <button className={STYLE} onClick={connectMetaMask}>
        Connect MetaMask
      </button>
    );
  }

  return (
    <div className="flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem]">
      <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
      <p className="font-montserrat text-[1rem] font-semibold text-[#F6F8FF]">
        {formatAccount(wallet.accounts[0])}
      </p>
    </div>
  );
}

const STYLE =
  "flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem] font-montserrat text-[1rem] font-semibold text-[#F6F8FF]";

const formatAccount = (account: string) =>
  `${account.slice(0, 8)}...${account.slice(-5)}`;
