import {
  dai_address,
  dai_contract,
  pool_data_provider_contract,
} from "../constants/contract";

export async function DAIBorrowTotal(): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getTotalDebt(dai_address)
    .call();
  const total = parseInt(data) / 10 ** parseInt(decimals);
  const result =
    "$" +
    total
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
