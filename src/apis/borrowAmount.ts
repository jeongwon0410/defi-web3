import {
  dai_address,
  dai_contract,
  pool_data_provider_contract,
} from "../constants/contract";

export async function DAIBorrowAmount(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getUserReserveData(dai_address, account)
    .call();

  const result =
    parseInt(data["currentVariableDebt"]) / 10 ** parseInt(decimals);

  if (result === 0) {
    return result.toString();
  } else {
    return result.toFixed(18);
  }
}
