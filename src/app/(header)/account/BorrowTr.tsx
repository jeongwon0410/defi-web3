"use client";

import { AccountIconTd, AccountTd, AccountTr } from "./AccountTable";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";
import { formatAPY, formatBalance, formatLTV } from "@/util/format";

export default function BorrowTr({ assetTitle }: { assetTitle: AssetTitle }) {
  const { data: balance } = usePrivateContract("SUPPLYBALANCE", assetTitle);
  const { data: apy } = useContract("BORROWAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);
  const { data: liquidation } = usePrivateContract("LIQUIDATION", assetTitle);

  return (
    <AccountTr>
      <AccountIconTd src={titleToIcon[assetTitle]} title={assetTitle} />
      <AccountTd className="w-[12ch]">{formatBalance(balance)}</AccountTd>
      <AccountTd className="w-[12ch]">{formatAPY(apy)}</AccountTd>
      <AccountTd className="w-[12ch]">{formatLTV(ltv)}</AccountTd>
      <AccountTd className="w-[12ch]">{liquidation?.toString()}</AccountTd>
    </AccountTr>
  );
}
