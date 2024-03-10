import Web3 from "web3";
import Pool from "../abi/Pool.json";
import USDC_ERC20 from "../abi/USDC_ERC20.json";
export let usdc_contract;
export let pool_contract;
export let usdc_avax_address;
export let pool_contract_addr;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running
  window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);

  usdc_avax_address = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8";
  usdc_contract = new web3.eth.Contract(USDC_ERC20, usdc_avax_address);
  pool_contract_addr = "0x4E11f0A8deBE774A2b4316ca13CAD2aBD0f27193";
  pool_contract = new web3.eth.Contract(Pool, pool_contract_addr);
}
