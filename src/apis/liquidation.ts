import {
  dai_address,
  dai_contract,
  pool_data_provider_contract,
} from "../constants/contract";

export async function DAILiquidation(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, account)
    .call();

  const borrow = data["currentVariableDebt"];

  const supply = data["currentATokenBalance"];

  const result =
    parseInt(borrow.toString()) /
    10 ** parseInt(decimals) /
    parseInt(supply.toString()) /
    10 ** parseInt(decimals);
  const ltv = await pool_data_provider_contract.methods
    .getReserveConfigurationData(dai_address)
    .call();
  const liquidation = result * parseInt(ltv["ltv"]);

  return liquidation.toFixed(2) + "%";
}
