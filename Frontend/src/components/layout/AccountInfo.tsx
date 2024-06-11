import { forwardRef, ReactNode } from "react";
import toast from "react-hot-toast";
import { useAccount, useDisconnect } from "wagmi";
import Image from "next/image";
import { CopyIcon, ExportIcon } from "./svg";
import { formatAccount } from "@/util/format";

const AccountInfo = forwardRef<
  HTMLDivElement,
  { openNetworkModal: () => void }
>((props, ref) => {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  const copyAddr = () => {
    if (address === undefined) return;
    navigator.clipboard.writeText(address);
    toast.success("Copied!");
  };

  const viewOnExplorer = () => {
    if (address === undefined) return;
    window.open(`https://sepolia.etherscan.io/address/${address}`, "_blank");
  };

  return (
    <div
      className="absolute right-0 top-[calc(100%+0.5rem)] z-50 flex flex-col items-center gap-[1.12rem] rounded-[0.7875rem] bg-[#262626] p-5 shadow-[0_3.6px_21.6px_0_rgba(0,0,0,0.12)]"
      ref={ref}
    >
      <div className="flex gap-1">
        <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
        <p className="font-montserrat text-[1rem] font-semibold text-[#F6F8FF]">
          {formatAccount(address)}
        </p>
      </div>

      <div className="flex gap-2">
        <AccountInfoButton onClick={props.openNetworkModal}>
          SWITCH NETWORK
        </AccountInfoButton>
        <AccountInfoButton onClick={disconnect}>DISCONNECT</AccountInfoButton>
      </div>

      <Divider />

      <div className="flex flex-col items-center">
        <p className="text-[0.6875rem] font-medium text-neutral-500">Network</p>
        <p className="text-base font-medium text-[#B0B0B0]">
          {chain?.name ?? "-"}
        </p>
      </div>

      <Divider />

      <div className="flex flex-col items-center gap-[0.67rem]">
        <IconButton onClick={copyAddr} icon={<CopyIcon />}>
          COPY ADDRESS
        </IconButton>
        <IconButton onClick={viewOnExplorer} icon={<ExportIcon />}>
          VIEW ON EXPLORER
        </IconButton>
      </div>
    </div>
  );
});

AccountInfo.displayName = "AccountInfo";

const AccountInfoButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      className="line-clamp-1 rounded-[0.3375rem] bg-[#151515] px-[0.56rem] text-[0.625rem] leading-[1.35rem] text-[#818A80]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const IconButton = ({
  onClick,
  icon,
  children,
}: {
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) => {
  return (
    <button className="flex items-center gap-2" onClick={onClick}>
      {icon}
      <p className="text-[0.875rem] text-[#E1E3EA]">{children}</p>
    </button>
  );
};

const Divider = () => (
  <div className="h-[0.11rem] w-[3.4875rem] rounded-[0.675rem] bg-[#333333]"></div>
);

export default AccountInfo;
