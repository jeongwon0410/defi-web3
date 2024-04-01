import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Header from "@/components/layout/Header";
import { MetaMaskContextProvider } from "@/util/useMetaMask";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <MetaMaskContextProvider>
      <Header />
      <div className="relative min-w-[1024px] py-20">
        {children}
        <Image
          fill
          src="/landing/background.svg"
          className="absolute bottom-0 left-0 right-0 top-0 -z-50 h-auto w-auto object-cover"
          alt=""
        />
      </div>
      <div>
        <Toaster />
      </div>
    </MetaMaskContextProvider>
  );
}
