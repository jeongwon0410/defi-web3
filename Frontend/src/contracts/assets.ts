import BigNumber from "bignumber.js";
import DAI_ERC20 from "./dev/abi/DAI";
import LINK_ERC20 from "./dev/abi/LINK";
import USDT_ERC20 from "./dev/abi/USDT";
import WBTC_ERC20 from "./dev/abi/WBTC";
import EURS_ERC20 from "./dev/abi/EURS";
import AAVE_ERC20 from "./dev/abi/AAVE";

// Common(?)

export const aaveOracleAddr = "0x2da88497588bf89281816106C7259e31AF45a663";
export const poolAddr = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
export const aaveDataProviderAddr =
  "0x3e9708d80f7B3e43118013075F7e95CE3AB31F31";

export const lendingPoolAddr = "0x398eC7346DcD622eDc5ae82352F02bE94C62d119";
export const priceOracleAddr = "0x";

// Title

export const allAssetTitles = [
  // dev
  "WBTC",
  "USDT",
  "LINK",
  "AAVE",
  "DAI",
  "EURS",

  // prod
  // "WETH",
  // "stWEMIX.e",
  // "USDC",
  // "WEMIX.e",
] as const;

export type AssetTitle = (typeof allAssetTitles)[number];

export const titleToAddr: { [title in AssetTitle]: `0x${string}` } = {
  // dev
  DAI: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357",
  USDT: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
  WBTC: "0x29f2D40B0605204364af54EC677bD022dA425d03",
  LINK: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
  AAVE: "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a",
  EURS: "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E",
  // WETH: "0x4200000000000000000000000000000000000001",

  // prod
  // "stWEMIX.e": "0xA5c7992710A94A2ef2e8E910b441bD70385DBAB8",
  // USDC: "0x0257e4d92C00C9EfcCa1d641b224d7d09cfa4522",
  // "WEMIX.e": "0x3720b1Dc2c8dde3BD6cfCf0b593D0A2bBCAc856e",
};

export const titleToABI = {
  // dev
  DAI: DAI_ERC20,
  USDT: USDT_ERC20,
  WBTC: WBTC_ERC20,
  LINK: LINK_ERC20,
  AAVE: AAVE_ERC20,
  EURS: EURS_ERC20,

  // prod
  //   WETH: WETH_ABI,
  //   "stWEMIX.e": stWEMIX_ABI,
  //   USDC: USDC_ABI,
  //   "WEMIX.e": WEMIX_ABI,
} satisfies { [title in AssetTitle]: unknown };

// https://cryptologos.cc/
export const titleToIcon = Object.fromEntries(
  allAssetTitles.map((title) => [title, `/icons/${title}.png`]),
) as { [title in AssetTitle]: string };

// titleToIcon.WETH = "/icons/WETH.webp";

export const allDecimals = {
  // dev
  DAI: BigNumber(10).pow(18),
  USDT: BigNumber(10).pow(6),
  WBTC: BigNumber(10).pow(8),
  LINK: BigNumber(10).pow(18),
  AAVE: BigNumber(10).pow(18),
  EURS: BigNumber(10).pow(2),

  // prod
  // WETH: BigNumber(10).pow(18),
  // "stWEMIX.e": BigNumber(10).pow(18),
  // USDC: BigNumber(10).pow(6),
  // "WEMIX.e": BigNumber(10).pow(18),
} satisfies { [title in AssetTitle]: BigNumber };
