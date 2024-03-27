import { ReactNode } from "react";
import { TmpContextProvider } from "@/components/TmpContext";
import "@/styles/globals.css";
import Background from "@/components/layout/Background";
import Header from "@/components/layout/Header";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <Background>
      <TmpContextProvider>
        <Header />
        {children}
      </TmpContextProvider>
    </Background>
  );
}
