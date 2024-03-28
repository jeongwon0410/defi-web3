import { ContractAbi } from "web3";
import USDC_ERC20 from "../abi/USDC_ERC20.json";
import DAI_ERC20 from "../abi/DAI_ERC20";
import LINK_ERC20 from "../abi/LINK_ERC20.json";
import USDT_ERC20 from "../abi/USDT_ERC20.json";
import WBTC_ERC20 from "../abi/WBTC_ERC20.json";
import WETH_ERC20 from "../abi/WETH_ERC20.json";
import EURS_ERC20 from "../abi/EURS_ERC20.json";
import AAVE_ERC20 from "../abi/AAVE_ERC20.json";

// Common(?)

export const aaveOracleAddr = "0x2da88497588bf89281816106C7259e31AF45a663";
export const poolAddr = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
export const poolDataProviderAddr =
  "0x3e9708d80f7B3e43118013075F7e95CE3AB31F31";

// Title

export const allAssetTitles = [
  "DAI",
  "USDT",
  "USDC",
  "WBTC",
  "LINK",
  "AAVE",
  "EURS",
  "WETH",
] as const;

export type AssetTitle = (typeof allAssetTitles)[number];

// Address

export const titleToAddr: { [title in AssetTitle]: string } = {
  DAI: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
  USDT: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
  USDC: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
  WBTC: "0x29f2D40B0605204364af54EC677bD022dA425d03",
  LINK: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
  AAVE: "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a",
  EURS: "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E",
  WETH: "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c",
};

// ABI

export const titleToABI = {
  DAI: DAI_ERC20,
  USDT: USDT_ERC20,
  USDC: USDC_ERC20,
  WBTC: WBTC_ERC20,
  LINK: LINK_ERC20,
  AAVE: AAVE_ERC20,
  EURS: EURS_ERC20,
  WETH: WETH_ERC20,
} satisfies { [title in AssetTitle]: ContractAbi };
