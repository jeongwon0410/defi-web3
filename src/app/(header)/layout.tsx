import { ReactNode } from "react";
import { TmpContextProvider } from "@/components/TmpContext";
import Header from "@/components/layout/Header";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <TmpContextProvider>
      <Header />
      {children}
    </TmpContextProvider>
  );
}
