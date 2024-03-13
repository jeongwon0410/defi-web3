import {
  dai_address,
  dai_contract,
  pool_contract,
  pool_data_provider_contract,
} from "./common";

export async function DAISupplyTotal(): Promise<number | undefined> {
  const decimals = await dai_contract.methods.decimals().call();
  const data = await pool_data_provider_contract.methods
    .getReserveConfigurationData(dai_address)
    .call();
  console.log(data);
  return data;
}
