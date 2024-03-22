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

export async function DAIMaxAmount(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();

  const balance = await dai_contract.methods.balanceOf(account).call();

  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function LINKMaxAmount(account: string): Promise<string> {
  const decimals = await link_contract.methods.decimals().call();

  const balance = await link_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function USDCMaxAmount(account: string): Promise<string> {
  const decimals = await usdc_contract.methods.decimals().call();

  const balance = await usdc_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function WBTCMaxAmount(account: string): Promise<string> {
  const decimals = await wbtc_contract.methods.decimals().call();

  const balance = await wbtc_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function WETHMaxAmount(account: string): Promise<string> {
  const decimals = await weth_contract.methods.decimals().call();

  const balance = await weth_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function USDTMaxAmount(account: string): Promise<string> {
  const decimals = await usdt_contract.methods.decimals().call();

  const balance = await usdt_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function AAVEMaxAmount(account: string): Promise<string> {
  const decimals = await aave_contract.methods.decimals().call();

  const balance = await aave_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
export async function EURSMaxAmount(account: string): Promise<string> {
  const decimals = await eurs_contract.methods.decimals().call();

  const balance = await eurs_contract.methods.balanceOf(account).call();
  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
