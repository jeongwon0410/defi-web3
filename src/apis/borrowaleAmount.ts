import {
  aave_oracle_contract,
  dai_address,
  dai_contract,
  poolContract,
} from "../constants/contract";

export async function DAIBorrowableAmount(account: string): Promise<string> {
  const decimals = await dai_contract.methods.decimals().call();

  const currency = await poolContract.methods
    .getUserAccountData(account)
    .call();

  const price = await aave_oracle_contract.methods
    .getAssetPrice(dai_address)
    .call();

  const maxUserAmountToBorrow =
    (parseInt(currency["availableBorrowsBase"]) / parseInt(price)) * 0.99;

  return maxUserAmountToBorrow.toFixed(10).toString();
}
