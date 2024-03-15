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

export async function DAIBalance(): Promise<string | undefined> {
  const decimals = await dai_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await dai_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();

    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function LINKBalance(): Promise<string | undefined> {
  const decimals = await link_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await link_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function USDCBalance(): Promise<string | undefined> {
  const decimals = await usdc_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await usdc_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function WBTCBalance(): Promise<string | undefined> {
  const decimals = await wbtc_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await wbtc_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function WETHBalance(): Promise<string | undefined> {
  const decimals = await weth_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await weth_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function USDTBalance(): Promise<string | undefined> {
  const decimals = await usdt_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await usdt_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function AAVEBalance(): Promise<string | undefined> {
  const decimals = await aave_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await aave_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
export async function EURSBalance(): Promise<string | undefined> {
  const decimals = await eurs_contract.methods.decimals().call();

  if (localStorage.getItem("account") !== "") {
    const balance = await eurs_contract.methods
      .balanceOf(localStorage.getItem("account"))
      .call();
    const result = parseInt(balance) / 10 ** parseInt(decimals);

    return result.toString();
  }
}
