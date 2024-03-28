import { normalize, valueToZDBigNumber } from "../util/bignumber";
import { rayPow, secondsToYear } from "../util/APY";
import { dai_address, poolContract } from "../constants/contract";

export async function DAIBorrowAPY(): Promise<string> {
  const RAY = 10 ** 27; // 10 to the power 27
  const RAY_DECIMALS = 27;
  const SECONDS_PER_YEAR = secondsToYear();
  const data = await poolContract.methods.getReserveData(dai_address).call();

  const apy = rayPow(
    valueToZDBigNumber(data["currentVariableBorrowRate"])
      .dividedBy(SECONDS_PER_YEAR)
      .plus(RAY),
    SECONDS_PER_YEAR,
  ).minus(RAY);
  const borrowAPY =
    (parseFloat(normalize(apy, RAY_DECIMALS)) * 100).toFixed(2) + "%";

  return borrowAPY;
}
