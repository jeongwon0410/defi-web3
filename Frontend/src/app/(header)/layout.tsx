import { ReactNode } from "react";
import Image from "next/image";
import CustomToaster from "../../components/CustomToaster";
import Header from "@/components/layout/Header";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="relative h-fit min-h-full w-fit min-w-full px-10 py-20">
        {children}
        <Image
          fill
          src="/landing/background.svg"
          className="absolute bottom-0 left-0 right-0 top-0 -z-50 h-auto w-auto object-cover"
          alt=""
        />
      </div>
      <CustomToaster />
    </>
  );
}
