import BigNumber from "bignumber.js";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import AaveProtocolDataProvider from "@/contracts/dev/abi/AaveProtocolDataProvider";
import {
  aaveOracleAddr,
  allAssetTitles,
  allDecimals,
  aaveDataProviderAddr,
  titleToAddr,
} from "@/contracts/assets";
import AaveOracle from "@/contracts/dev/abi/AaveOracle";

export default async function getTotalMarketValueDev() {
  const dataList = await Promise.all(
    allAssetTitles.map(async (title) =>
      publicClient.readContract({
        abi: AaveProtocolDataProvider,
        address: aaveDataProviderAddr,
        functionName: "getReserveData",
        args: [titleToAddr[title]],
      }),
    ),
  );

  const assetPrices = await publicClient.readContract({
    abi: AaveOracle,
    address: aaveOracleAddr,
    functionName: "getAssetsPrices",
    args: [allAssetTitles.map((title) => titleToAddr[title])],
  });

  const value = dataList.reduce((prev, cur, idx) => {
    const val = BigNumber(cur[2].toString());
    return prev.plus(
      val
        .dividedBy(allDecimals[allAssetTitles[idx]])
        .multipliedBy(
          BigNumber(assetPrices[idx].toString()).dividedBy(
            BigNumber(10).pow(8),
          ),
        ),
    );
  }, BigNumber(0));

  return value;
}

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://sepolia.gateway.tenderly.co", { batch: true }),
});
