"use client";

import { AccountIconTd, AccountTd, AccountTr } from "./AccountTable";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";
import {
  formatAPY,
  formatBalance,
  formatLiquidation,
  formatLTV,
} from "@/util/format";

export default function BorrowTr({ assetTitle }: { assetTitle: AssetTitle }) {
  const { data: balance } = usePrivateContract("BORROWAMOUNT", assetTitle);
  const { data: apy } = useContract("BORROWAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);
  const { data: liquidation } = usePrivateContract("LIQUIDATION", assetTitle);

  return (
    <AccountTr className={balance?.isEqualTo(0) === true ? "opacity-30" : ""}>
      <AccountIconTd src={titleToIcon[assetTitle]} title={assetTitle} />
      <AccountTd className="w-[12ch]">{formatBalance(balance)}</AccountTd>
      <AccountTd className="w-[12ch]">{formatAPY(apy)}</AccountTd>
      <AccountTd className="w-[12ch]">{formatLTV(ltv)}</AccountTd>
      <AccountTd className="w-[12ch]">
        {formatLiquidation(liquidation)}
      </AccountTd>
    </AccountTr>
  );
}
