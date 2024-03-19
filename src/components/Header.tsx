import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import ConnectWalletButton from "./ConnectWalletButton";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ConnectButton from "./ConnectButton";
import { useMutation, useQuery } from "react-query";
import getAddress from "@/apis/getAddress";
import saveAddress from "@/apis/saveAddress";

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}
export default function Header({ setAccount }: Props) {
  const router = useRouter();

  const host =
    typeof window !== "undefined"
      ? window.location.host
      : "http://localhost:3000";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };

  return (
    <header className="body-font">
      <div className=" flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="flex title-font font-medium items-center mb-4 md:mb-0">
          <img src="light.png" className="h-[28px] w-[21px] mr-2" />
          <div className="text-[20px] leading-[20px] font-extrabold font-montserrat text-[#D9FFCC]">
            LightBank
          </div>
        </div>
        <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center  justify-center">
          <button onClick={() => router.push("/")}>
            {router.pathname === "/" ? (
              <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-white">
                Bank
              </div>
            ) : (
              <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-[#F6F8FF]/[50%]">
                Bank
              </div>
            )}
          </button>
          <button onClick={() => router.push("/account")}>
            {router.pathname === "/account" ? (
              <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-white">
                My Account
              </div>
            ) : (
              <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-[#F6F8FF]/[50%]">
                My Account
              </div>
            )}
          </button>
          <button onClick={() => router.push("/reward")}>
            {router.pathname === "/reward" ? (
              <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-white">
                Reward
              </div>
            ) : (
              <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-[#F6F8FF]/[50%]">
                Reward
              </div>
            )}
          </button>
        </div>
        <ConnectButton setAccount={setAccount} />
        {/* <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton setAccount={setAccount} />
        </MetaMaskProvider> */}
      </div>
    </header>
  );
}
