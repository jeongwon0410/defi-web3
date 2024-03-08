import Web3 from "web3";
import abi from "./abi.json";

const host =
  typeof window !== "undefined" ? window.location.host : "defaultHost";

export let contract;
export let daiAmountinWei;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running
  window.ethereum.request({ method: "eth_requestAccounts" });
  const web3 = new Web3(window.ethereum);
  const C_address = "0x883fe67d1BD395aA68734d117d32bd0e88E5ec27";
  contract = new web3.eth.Contract(abi, C_address);
  daiAmountinWei = web3.utils.toWei("1000", "gwei");
}
