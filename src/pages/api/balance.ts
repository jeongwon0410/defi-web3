import {
  aave_contract,
  dai_contract,
  eurs_contract,
  link_contract,
  usdc_contract,
  usdt_contract,
  wbtc_contract,
  weth_contract,
} from "@/pages/api/common";

export async function DAIBalance(): Promise<number | undefined> {
  const decimals = await dai_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await dai_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();

    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function LINKBalance() {
  const decimals = await link_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await link_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function USDCBalance() {
  const decimals = await usdc_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await usdc_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function WBTCBalance() {
  const decimals = await wbtc_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await wbtc_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function WETHBalance() {
  const decimals = await weth_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await weth_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function USDTBalance() {
  const decimals = await usdt_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await usdt_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function AAVEBalance() {
  const decimals = await aave_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await aave_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
export async function EURSBalance() {
  const decimals = await eurs_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const callbalance = await eurs_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    return parseInt(callbalance) / 10 ** parseInt(decimals);
  }
}
