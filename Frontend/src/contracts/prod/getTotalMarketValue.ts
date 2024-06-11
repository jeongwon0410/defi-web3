import BigNumber from "bignumber.js";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import { WEI } from "../util";
import LendingPool_ABI from "./abi/LendingPool_ABI";
import IPriceOracleGetter_ABI from "./abi/IPriceOracleGetter_ABI";
import {
  allAssetTitles,
  allDecimals,
  titleToAddr,
  lendingPoolAddr,
  priceOracleAddr,
} from "@/contracts/assets";

export default async function getTotalMarketValueProd() {
  const dataList = await Promise.all(
    allAssetTitles.map(async (title) =>
      publicClient.readContract({
        abi: LendingPool_ABI,
        address: lendingPoolAddr,
        functionName: "getReserveData",
        args: [titleToAddr[title]],
      }),
    ),
  );

  const assetPrices = await publicClient.readContract({
    abi: IPriceOracleGetter_ABI,
    address: priceOracleAddr,
    functionName: "getAssetsPrices",
    args: [allAssetTitles.map((title) => titleToAddr[title])],
  });

  const value = dataList.reduce((prev, cur, idx) => {
    const val = BigNumber(cur[0].toString());
    return prev.plus(
      val
        .dividedBy(allDecimals[allAssetTitles[idx]])
        .multipliedBy(BigNumber(assetPrices[idx].toString()).dividedBy(WEI)),
    );
  }, BigNumber(0));

  return value;
}

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://sepolia.gateway.tenderly.co", { batch: true }),
});
