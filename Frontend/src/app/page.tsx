export const revalidate = 60;

import Image from "next/image";
import Logo from "/public/common/logo.svg";
import Link from "next/link";
import { Suspense } from "react";
import {
  DOCUMENT_LINK,
  GITBOOK_LINK,
  MEDIA_KIT_LINK,
  MEDIUM_LINK,
  PRIVACY_POLICY_LINK,
  TELEGRAM_LINK,
  TERM_LINK,
  TWITTER_LINK,
} from "@/constants/main";
import RemainQueryLink from "@/components/RemainQueryLink";
import { getTotalMarketValue } from "@/contracts/serverIndex";

export default function LandingPage() {
  return (
    <div className="relative h-[100vh] w-[100vw]">
      <Image
        src="/landing/lighthouse.png"
        width={2824}
        height={892}
        alt=""
        className="object-fit absolute bottom-0 -z-10 h-auto w-auto"
        priority
      />

      <Header />

      <div className="mt-[12vh] flex">
        <div className="grow-[1]" />
        <div className="flex flex-col gap-[8vh]">
          <Top />
          <Suspense>
            <Middle />
          </Suspense>
        </div>
        <div className="grow-[3]" />
      </div>

      <Bottom />

      <Links />

      <Image
        fill
        src="/landing/background.svg"
        className="absolute bottom-0 left-0 right-0 top-0 -z-50 h-auto w-auto object-cover"
        alt=""
      />
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex justify-center">
      <div className="flex grow justify-between px-[10vw]">
        <div className="mt-4 flex cursor-pointer items-center">
          <Logo />
          <h3 className="font-montserrat text-[1.3125rem] font-bold text-[#D9FFCC]">
            LIGHTBANK
          </h3>
        </div>
        <RemainQueryLink
          className="flex h-[3.5rem] w-[8.7rem] -translate-y-2 items-center justify-center rounded-bl-2xl rounded-br-2xl bg-gradient-to-r from-[#567554] to-[#6EC568] text-[1.1rem] font-bold text-white shadow-[3.2px_3.2px_4px_0px_rgba(0,0,0,0.25)] transition-all hover:translate-y-0"
          href="/bank"
        >
          <span className="translate-y-1">Launch App</span>
        </RemainQueryLink>
      </div>
    </div>
  );
};

const Top = () => (
  <div>
    <h2 className="font-montserrat text-[1.5rem] font-normal leading-[120%] text-white">
      WE MAKE YOUR WALLET HEAVY
    </h2>
    <h1 className="font-montserrat text-[6.0625rem] font-bold leading-[120%] text-white [text-shadow:0px_0px_15.957px_rgba(129,189,124,0.14)]">
      LIGHTBANK
    </h1>
    <h3 className="mb-[2.31rem] mt-[15px] text-[0.9375rem] font-normal leading-[150%] text-[#8D968E]">
      LIGHTBANK is the very first money market for Kroma - enlightening the L2s.
      <br />
      When the lights out, we be right back.
    </h3>
  </div>
);

const Middle = async () => {
  const value = await getTotalMarketValue();
  return (
    <div>
      <p className="font-montserrat text-[1.1875rem] font-semibold leading-[2.27813rem] text-[#D9FFCC]">
        Total Market Value
      </p>
      <p className="mt-[0.57rem] font-montserrat text-[3.625rem] font-bold leading-[2.43rem] text-[#D9FFCC]">
        ${value.toFormat(0)}
      </p>
    </div>
  );
};

const Bottom = () => {
  return (
    <div className="absolute bottom-[15vh] left-[50vw] flex translate-x-[-50%] flex-col items-center">
      <div className="flex gap-[1rem]">
        <CircleLink src="/landing/paperplane.svg" href={TELEGRAM_LINK} />
        <CircleLink src="/landing/twitter.svg" href={TWITTER_LINK} />
        <CircleLink src="/landing/medium.svg" href={MEDIUM_LINK} />
        <CircleLink src="/landing/gitbook.svg" href={GITBOOK_LINK} />
      </div>
      <p className="mb-2 mt-[1.8rem] font-montserrat text-[0.961rem] font-semibold text-[#D9FFCC]">
        Ecosystem
      </p>
      <Ecosystem src="/landing/kroma.png" />
    </div>
  );
};

const CircleLink = ({ src, href }: { src: string; href: string }) => (
  <Link href={href}>
    <Image src={src} width={33.23} height={27} alt="" />
  </Link>
);

const Ecosystem = ({ src }: { src: string }) => (
  <Image src={src} width={122} height={40} alt="" className="h-auto w-auto" />
);

const Links = () => {
  return (
    <div className="absolute bottom-[10vh] right-[10vw] flex flex-col items-end text-[0.75rem] font-bold leading-[1.875rem] text-[#818A80]">
      <Link href={TERM_LINK}>Terms and Conditions</Link>
      <Link href={DOCUMENT_LINK}>Documentation</Link>
      <Link href={MEDIA_KIT_LINK}>Media Kit (Logo package)</Link>
      <Link href={PRIVACY_POLICY_LINK}>Privacy Policy</Link>
    </div>
  );
};
