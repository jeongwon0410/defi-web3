"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";
import ConnectButton from "./ConnectButton";

export default function Header() {
  return (
    <header className="flex flex-col flex-wrap items-center p-5 md:flex-row">
      <Link className="mb-4 flex items-center font-medium md:mb-0" href="/">
        <Image
          src="/light.png"
          className="mr-2"
          alt=""
          height={28}
          width={21}
        />
        <div className="font-montserrat text-[20px] font-extrabold leading-[20px] text-[#D9FFCC]">
          LightBank
        </div>
      </Link>

      <div className="flex flex-wrap items-center justify-center md:ml-4 md:mr-auto md:py-1  md:pl-4">
        <Label href="/bank">Bank</Label>
        <Label href="/account">Account</Label>
        <Label href="/reward">Reward</Label>
      </div>

      <ConnectButton />
    </header>
  );
}

const Label = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const highlighted = pathname === href;

  return (
    <Link
      href={href}
      className={`mr-5 text-[14px] font-semibold leading-[20px] ${highlighted ? "text-white" : "text-[#F6F8FF]/[50%]"}`}
    >
      {children}
    </Link>
  );
};
