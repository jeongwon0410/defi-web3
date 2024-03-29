import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import { MetaMaskContextProvider } from "@/util/useMetaMask";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <MetaMaskContextProvider>
      <Header />
      {children}
    </MetaMaskContextProvider>
  );
}
