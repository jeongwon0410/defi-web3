import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import AccountInfo from "./AccountInfo";
import NetworkModal from "./NetworkModal";
import { useOutsideAlerter } from "@/util/hook";
import { formatAccount } from "@/util/format";

export default function WalletButton() {
  const { isConnected } = useAccount();

  return isConnected ? <ConnectedButton /> : <NotConnectedButton />;
}

const ConnectedButton = () => {
  const { address } = useAccount();
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setExpanded(false), []);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideAlerter(ref, close);

  return (
    <div className="relative flex w-full flex-col items-end">
      <button
        className="flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem]"
        onClick={() => setExpanded((x) => !x)}
      >
        <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
        <p className="font-montserrat text-[1rem] font-semibold text-[#F6F8FF]">
          {formatAccount(address)}
        </p>
      </button>
      {expanded && (
        <AccountInfo
          ref={ref}
          openNetworkModal={() => {
            setIsOpen(true);
            setExpanded(false);
          }}
        />
      )}
      <NetworkModal isOpen={isOpen} close={() => setIsOpen(false)} />
    </div>
  );
};

const NotConnectedButton = () => {
  const { connect } = useConnect();

  return (
    <button
      className="flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem] font-montserrat text-[0.9rem] font-semibold text-[#F6F8FF]"
      onClick={() => connect({ connector: injected() })}
    >
      Connect MetaMask
    </button>
  );
};
