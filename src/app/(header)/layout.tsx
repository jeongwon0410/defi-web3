import { ReactNode } from "react";
import { AccountContextProvider } from "@/components/TmpContext";
import Header from "@/components/layout/Header";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <AccountContextProvider>
      <Header />
      {children}
    </AccountContextProvider>
  );
}
