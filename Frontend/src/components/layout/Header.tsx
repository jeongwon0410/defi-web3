"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import RemainQueryLink from "../RemainQueryLink";
import WalletButton from "./ConnectButton";

export default function Header() {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 mx-[5vw] mt-6 flex items-center justify-between">
      <Left />
      <WalletButton />
    </header>
  );
}

const Left = () => (
  <div className="flex shrink-0 items-center gap-[1.87rem]">
    <RemainQueryLink className="flex items-center font-medium" href="/">
      <Image
        src="/common/logo.svg"
        className="object-cover"
        alt=""
        height={40}
        width={40}
      />
      <div className="font-montserrat text-[1.3125rem] font-semibold text-[#D9FFCC]">
        LIGHTBANK
      </div>
    </RemainQueryLink>

    <div className="flex gap-6">
      <Label href="/bank">Bank</Label>
      <Label href="/account">My Account</Label>
      <Label href="/reward">Reward</Label>
    </div>
  </div>
);

const Label = ({ href, children }: { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const highlighted = pathname === href;

  return (
    <RemainQueryLink
      href={href}
      className={`text-[0.875rem] font-semibold text-[#F6F8FF] ${highlighted ? "" : "opacity-[50%]"}`}
    >
      {children}
    </RemainQueryLink>
  );
};
