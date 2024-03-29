import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import { MetaMaskContextProvider } from "@/util/useMetaMask";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <MetaMaskContextProvider>
      <Header />
      <div className="py-20">{children}</div>
    </MetaMaskContextProvider>
  );
}
