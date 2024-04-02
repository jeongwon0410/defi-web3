import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Provider from "@/Provider";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <Provider>
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
      <Toaster />
    </Provider>
  );
}
