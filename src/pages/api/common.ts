import Web3 from "web3";
import Pool from "../abi/Pool.json";
import USDC_ERC20 from "../abi/USDC_ERC20.json";
import DAI_ERC20 from "../abi/DAI_ERC20.json";
import LINK_ERC20 from "../abi/LINK_ERC20.json";
import USDT_ERC20 from "../abi/USDT_ERC20.json";
import WBTC_ERC20 from "../abi/WBTC_ERC20.json";
import WETH_ERC20 from "../abi/WETH_ERC20.json";
import EURS_ERC20 from "../abi/EURS_ERC20.json";
import AAVE_ERC20 from "../abi/AAVE_ERC20.json";
import PoolDataProvider from "../abi/PoolDataProvider.json";
import AaveOracle from "../abi/AaveOracle.json";
export let usdc_contract: any;
export let pool_contract: any;
export let dai_contract: any;
export let aave_contract: any;
export let eurs_contract: any;
export let link_contract: any;
export let usdt_contract: any;
export let wbtc_contract: any;
export let weth_contract: any;
export let pool_data_provider_contract: any;

export let aave_oracle_address: string;
export let aave_oracle_contract: any;

export let usdc_address: string;
export let pool_address: string;
export let dai_address: string;
export let aave_address: string;
export let eurs_address: string;
export let link_address: string;
export let usdt_address: string;
export let wbtc_address: string;
export let weth_address: string;
export let pool_data_provider_address: string;

export const name = [
  "DAI",
  "USDT",
  "USDC",
  // "ETH",
  "WBTC",
  "LINK",
  "AAVE",
  "EURS",
  "WETH",
];

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running
  window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);

  usdc_address = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8";
  usdc_contract = new web3.eth.Contract(USDC_ERC20, usdc_address);
  dai_address = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";
  dai_contract = new web3.eth.Contract(DAI_ERC20, dai_address);
  aave_address = "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a";
  aave_contract = new web3.eth.Contract(AAVE_ERC20, aave_address);
  eurs_address = "0x6d906e526a4e2Ca02097BA9d0caA3c382F52278E";
  eurs_contract = new web3.eth.Contract(EURS_ERC20, eurs_address);
  link_address = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5";
  link_contract = new web3.eth.Contract(LINK_ERC20, link_address);
  usdt_address = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0";
  usdt_contract = new web3.eth.Contract(USDT_ERC20, usdt_address);
  wbtc_address = "0x29f2D40B0605204364af54EC677bD022dA425d03";
  wbtc_contract = new web3.eth.Contract(WBTC_ERC20, wbtc_address);
  weth_address = "0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c";
  weth_contract = new web3.eth.Contract(WETH_ERC20, weth_address);
  pool_address = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
  pool_contract = new web3.eth.Contract(Pool, pool_address);
  pool_data_provider_address = "0x3e9708d80f7B3e43118013075F7e95CE3AB31F31";
  pool_data_provider_contract = new web3.eth.Contract(
    PoolDataProvider,
    pool_data_provider_address
  );

  aave_oracle_address = "0x2da88497588bf89281816106C7259e31AF45a663";
  aave_oracle_contract = new web3.eth.Contract(AaveOracle, aave_oracle_address);
}
