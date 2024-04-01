import { ReactNode } from "react";
import Image from "next/image";
import AllMarketButton from "./AllMarketButton";
import BorrowTable from "@/app/(header)/bank/BorrowTable";
import SupplyTable from "@/app/(header)/bank/SupplyTable";
import Switch from "@/app/(header)/bank/Switch";

export default function Main({
  searchParams,
}: {
  searchParams: { tab?: string; expanded?: string };
}) {
  const tab = searchParams?.tab === "borrow" ? "borrow" : "supply";
  const expanded = searchParams.expanded === "true";

  return (
    <div className="flex flex-col justify-center">
      <Switch tab={tab} />

      {tab === "supply" ? (
        <SupplyTable expanded={expanded} />
      ) : (
        <BorrowTable expanded={expanded} />
      )}

      <AllMarketButton expanded={expanded} />

      <InfoLabel>
        If I supply $## DAI, I can make a interest ##% a year
      </InfoLabel>
    </div>
  );
}

const InfoLabel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-[3.25rem] flex flex-col items-center gap-[0.62rem]">
      <div className="flex items-center gap-2">
        <Image
          src="/bank/line.svg"
          width={200}
          height={32}
          alt=""
          className="h-auto w-auto rotate-180"
        />
        <Image
          src="/bank/person.svg"
          width={32}
          height={32}
          alt=""
          className="h-auto w-auto"
        />
        <Image
          src="/bank/line.svg"
          width={200}
          height={32}
          alt=""
          className="h-auto w-auto"
        />
      </div>
      <div className="text-[0.875rem] font-medium text-[#95A190]">
        {children}
      </div>
    </div>
  );
};
