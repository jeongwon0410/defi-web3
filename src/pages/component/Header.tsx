import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { contract, daiAmountinWei } from "../api/common";
export default function Header() {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };

  const handleClick = async () => {
    // await contract.methods
    //   .deposit("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", daiAmountinWei, 0)
    //   .send({ from: "0x3eac6cEd02C4610135376EC4627A8D5433B41a04" })
    //   .catch((e: any) => {
    //     throw Error(
    //       `Error depositing to the LendingPool contract: ${e.message}`
    //     );
    //   });
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
          <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-white">
            Bank
          </div>
          <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-white">
            My Account
          </div>
          <div className="mr-5 font-pretendard text-[14px] leading-[20px] font-semibold text-white">
            Reward
          </div>
        </div>

        <div>
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <ConnectWalletButton />
          </MetaMaskProvider>
        </div>
      </div>
    </header>
  );
}
