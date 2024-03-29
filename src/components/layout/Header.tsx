"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { ReactNode } from "react";
import Link from "next/link";
import ConnectButton from "./ConnectButton";

export default function Header() {
  return (
    <header className="mx-[5vw] mt-6 flex items-center justify-between">
      <Left />
      <ConnectButton />
    </header>
  );
}

const Left = () => (
  <div className="flex items-center gap-[1.87rem]">
    <Link className="flex items-center font-medium" href="/">
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
    </Link>

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
    <Link
      href={href}
      className={`text-[0.875rem] font-semibold text-[#F6F8FF] ${highlighted ? "" : "opacity-[50%]"}`}
    >
      {children}
    </Link>
  );
};
