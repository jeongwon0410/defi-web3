import { AccountIconTd, AccountTd, AccountTr } from "./AccountTable";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";

export default function BorrowTr({ assetTitle }: { assetTitle: AssetTitle }) {
  const { data: balance } = usePrivateContract("SUPPLYBALANCE", assetTitle);
  const { data: apy } = useContract("BORROWAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);
  const { data: liquidation } = usePrivateContract("LIQUIDATION", assetTitle);

  return (
    <AccountTr>
      <AccountIconTd src={titleToIcon[assetTitle]} title={assetTitle} />
      <AccountTd>{balance?.toString() ?? "-"}</AccountTd>
      <AccountTd>{apy?.toString() ?? "-"}</AccountTd>
      <AccountTd>{ltv?.toString() ?? "-"}</AccountTd>
      <AccountTd>{liquidation?.toString() ?? "-"}</AccountTd>
    </AccountTr>
  );
}
