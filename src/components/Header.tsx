import { useRouter } from "next/router";
import ConnectButton from "./ConnectButton";

export default function Header() {
  const router = useRouter();

  const host =
    typeof window !== "undefined"
      ? window.location.host
      : "http://10.41.169.226:3001";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "EventSea",
      url: host, // using the host constant defined above
    },
  };

  return (
    <header className="body-font">
      <div className=" flex flex-col flex-wrap items-center p-5 md:flex-row">
        <div className="title-font mb-4 flex items-center font-medium md:mb-0">
          <img src="light.png" className="mr-2 h-[28px] w-[21px]" />
          <div className="font-montserrat text-[20px] font-extrabold leading-[20px] text-[#D9FFCC]">
            LightBank
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center md:ml-4 md:mr-auto md:py-1  md:pl-4">
          <button onClick={() => router.push("/")}>
            {router.pathname === "/" ? (
              <div className="mr-5 font-pretendard text-[14px] font-semibold leading-[20px] text-white">
                Bank
              </div>
            ) : (
              <div className="mr-5 font-pretendard text-[14px] font-semibold leading-[20px] text-[#F6F8FF]/[50%]">
                Bank
              </div>
            )}
          </button>
          <button onClick={() => router.push("/account")}>
            {router.pathname === "/account" ? (
              <div className="mr-5 font-pretendard text-[14px] font-semibold leading-[20px] text-white">
                My Account
              </div>
            ) : (
              <div className="mr-5 font-pretendard text-[14px] font-semibold leading-[20px] text-[#F6F8FF]/[50%]">
                My Account
              </div>
            )}
          </button>
          <button onClick={() => router.push("/reward")}>
            {router.pathname === "/reward" ? (
              <div className="mr-5 font-pretendard text-[14px] font-semibold leading-[20px] text-white">
                Reward
              </div>
            ) : (
              <div className="mr-5 font-pretendard text-[14px] font-semibold leading-[20px] text-[#F6F8FF]/[50%]">
                Reward
              </div>
            )}
          </button>
        </div>
        <ConnectButton />
        {/* <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton setAccount={setAccount} />
        </MetaMaskProvider> */}
      </div>
    </header>
  );
}
