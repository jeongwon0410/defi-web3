import Image from "next/image";
import {
  forwardRef,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

// Reference: https://docs.metamask.io/wallet/reference/provider-api/
export default function WalletButton() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();

  if (isConnected) return <ConnectedButton />;

  // TODO:
  // if (account.connector === undefined)
  //   return (
  //     <Link href="https://metamask.io" target="_blank" className={STYLE}>
  //       <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
  //       Install Metamask
  //     </Link>
  //   );

  return (
    <button
      className={STYLE}
      onClick={() => connect({ connector: injected() })}
    >
      Connect MetaMask
    </button>
  );
}

const ConnectedButton = () => {
  const { address } = useAccount();
  const [expanded, setExpanded] = useState(false);

  const close = useCallback(() => setExpanded(false), []);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, close);

  return (
    <div>
      <button
        className="flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem]"
        onClick={() => setExpanded((x) => !x)}
      >
        <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
        <p className="font-montserrat text-[1rem] font-semibold text-[#F6F8FF]">
          {formatAccount(address)}
        </p>
      </button>
      <div className="relative">{expanded && <AccountInfo ref={ref} />}</div>
    </div>
  );
};

const AccountInfo = forwardRef<HTMLDivElement>((props, ref) => {
  const { address, chain } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div
      className="absolute right-0 top-4 z-50 flex flex-col items-center gap-[1.12rem] rounded-[0.7875rem] bg-[#262626] p-5 shadow-[0_3.6px_21.6px_0_rgba(0,0,0,0.12)]"
      ref={ref}
    >
      <div className="flex gap-1">
        <Image src="/header/metamask.svg" alt="" height={21.6} width={21.6} />
        <p className="font-montserrat text-[1rem] font-semibold text-[#F6F8FF]">
          {formatAccount(address)}
        </p>
      </div>
      <div className="flex justify-center gap-2">
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
      <button
        className="flex items-center gap-1"
        onClick={() => {
          if (address === undefined) return;
          navigator.clipboard.writeText(address);
          toast.success("Copied!");
        }}
      >
        <CopyIcon />
        <p className="text-[0.875rem] text-[#E1E3EA]">COPY ADDRESS</p>
      </button>
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

const Divider = () => (
  <div className="h-[0.11rem] w-[3.4875rem] rounded-[0.675rem] bg-[#333333]"></div>
);

const STYLE =
  "flex items-center gap-[0.34rem] rounded-full bg-[#262626] px-[1.12rem] py-[0.52rem] font-montserrat text-[1rem] font-semibold text-[#F6F8FF]";

const formatAccount = (account?: string) =>
  account ? `${account.slice(0, 8)}...${account.slice(-5)}` : "-";

const useOutsideAlerter = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current === null) return;
      if (event.target instanceof HTMLElement === false) return;
      if (ref.current.contains(event.target)) return;

      callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
};

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M14.3996 6.9751H8.32461C7.57902 6.9751 6.97461 7.57951 6.97461 8.3251V14.4001C6.97461 15.1457 7.57902 15.7501 8.32461 15.7501H14.3996C15.1452 15.7501 15.7496 15.1457 15.7496 14.4001V8.3251C15.7496 7.57951 15.1452 6.9751 14.3996 6.9751Z"
      stroke="#B0B0B0"
      stroke-width="1.62"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.275 11.025H3.6C3.24196 11.025 2.89858 10.8828 2.64541 10.6296C2.39223 10.3764 2.25 10.033 2.25 9.675V3.6C2.25 3.24196 2.39223 2.89858 2.64541 2.64541C2.89858 2.39223 3.24196 2.25 3.6 2.25H9.675C10.033 2.25 10.3764 2.39223 10.6296 2.64541C10.8828 2.89858 11.025 3.24196 11.025 3.6V4.275"
      stroke="#B0B0B0"
      stroke-width="1.62"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
