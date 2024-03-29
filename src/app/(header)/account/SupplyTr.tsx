import { AccountTr, AccountTd, AccountIconTd } from "./AccountTable";
import { AssetTitle, titleToIcon } from "@/constants/assets";
import { useContract, usePrivateContract } from "@/apis/swr";

export default function SupplyTr({ assetTitle }: { assetTitle: AssetTitle }) {
  const { data: balance } = usePrivateContract("SUPPLYBALANCE", assetTitle);
  const { data: apy } = useContract("SUPPLYAPY", assetTitle);
  const { data: ltv } = useContract("MAXLTV", assetTitle);

  return (
    <AccountTr>
      <AccountIconTd src={titleToIcon[assetTitle]} title={assetTitle} />
      <AccountTd>{balance?.toString() ?? "-"}</AccountTd>
      <AccountTd>{apy?.toString() ?? "-"}</AccountTd>
      <AccountTd>{ltv?.toString() ?? "-"}</AccountTd>
    </AccountTr>
  );
}
