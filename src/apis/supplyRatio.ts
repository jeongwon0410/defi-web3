import {
  dai_address,
  dai_contract,
  pool_data_provider_contract,
} from "../constants/contract";

export async function DAIMySupplyRatio(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const user = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, account)
    .call();

  const total = await pool_data_provider_contract.methods
    .getReserveData(dai_address)
    .call();

  const percent =
    (parseInt(user["currentATokenBalance"]) / parseInt(total["totalAToken"])) *
    100;

  const result = parseFloat(percent.toString()).toFixed(2) + "%";

  return result;
}
