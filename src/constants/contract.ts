import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import Pool from "../abi/Pool";
import AaveOracle from "../abi/AaveOracle.json";
import PoolDataProvider from "../abi/PoolDataProvider";
import {
  aaveOracleAddr,
  allAssetTitles,
  AssetTitle,
  poolAddr,
  poolDataProviderAddr,
  titleToABI,
  titleToAddr,
} from "@/constants/assets";

// TOOD: null 예외 처리
export let aave_oracle_contract: Contract<typeof AaveOracle>;
export let pool_contract: Contract<typeof Pool>;
export let pool_data_provider_contract: Contract<typeof PoolDataProvider>;

export const titleToContract: {
  [title in AssetTitle]: Contract<(typeof titleToABI)[title]> | null;
} = {
  DAI: null,
  USDT: null,
  USDC: null,
  WBTC: null,
  LINK: null,
  AAVE: null,
  EURS: null,
  WETH: null,
};

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running

  // TODO: 아래 줄 필요한지
  // window.ethereum.request({ method: "eth_requestAccounts" });

  const web3 = new Web3(window.ethereum);

  for (const title of allAssetTitles) {
    titleToContract[title] = new web3.eth.Contract(
      titleToABI[title],
      titleToAddr[title],
    );
  }

  aave_oracle_contract = new web3.eth.Contract(AaveOracle, aaveOracleAddr);
  pool_contract = new web3.eth.Contract(Pool, poolAddr);
  pool_data_provider_contract = new web3.eth.Contract(
    PoolDataProvider,
    poolDataProviderAddr,
  );
}
