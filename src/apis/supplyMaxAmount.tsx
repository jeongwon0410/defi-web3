import { dai_contract } from "@/constants/contract";

export async function DAIMaxAmount(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();

  const balance = await dai_contract.methods.balanceOf(account).call();

  const result = parseInt(balance) / 10 ** parseInt(decimals);

  return result.toString();
}
