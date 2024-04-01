"use client";

import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function AllMarketButton({ expanded }: { expanded: boolean }) {
  const toggle = useExpand();

  return (
    <button
      className="mt-5 flex flex-col items-center hover:opacity-50"
      onClick={toggle}
    >
      <div className="flex items-center">
        <Image src="/bank/add.svg" width={16} height={16} alt="" />
        <div className=" text-[0.8rem] font-semibold text-[#525C52]">
          {expanded ? "Shrink" : "All market"}
        </div>
      </div>
      <div className="mt-1 h-[1px] w-[99px] bg-[#525C52]" />
    </button>
  );
}

const useExpand = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      "expanded",
      params.get("expanded") === "true" ? "false" : "true",
    );
    router.replace(pathname + "?" + params.toString());
  };
};
