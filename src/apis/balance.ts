import {
  aave_contract,
  dai_contract,
  eurs_contract,
  link_contract,
  usdc_contract,
  usdt_contract,
  wbtc_contract,
  weth_contract,
} from "@/apis/common";

export async function DAIBalance(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();

  const balance = await dai_contract.methods.balanceOf(account).call();

  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

  return result;
}
export async function LINKBalance(account: string): Promise<string> {
  const decimals = await link_contract.methods.decimals().call();

  const balance = await link_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export async function USDCBalance(account: string): Promise<string> {
  const decimals = await usdc_contract.methods.decimals().call();

  const balance = await usdc_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export async function WBTCBalance(account: string): Promise<string> {
  const decimals = await wbtc_contract.methods.decimals().call();

  const balance = await wbtc_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export async function WETHBalance(account: string): Promise<string> {
  const decimals = await weth_contract.methods.decimals().call();

  const balance = await weth_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export async function USDTBalance(account: string): Promise<string> {
  const decimals = await usdt_contract.methods.decimals().call();

  const balance = await usdt_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export async function AAVEBalance(account: string): Promise<string> {
  const decimals = await aave_contract.methods.decimals().call();

  const balance = await aave_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export async function EURSBalance(account: string): Promise<string> {
  const decimals = await eurs_contract.methods.decimals().call();

  const balance = await eurs_contract.methods.balanceOf(account).call();
  const bal = parseInt(balance) / 10 ** parseInt(decimals);
  const result =
    "$" +
    bal
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
