import { ethers } from "hardhat";

async function main() {

  const _reserve = "0x4200000000000000000000000000000000000001"; // Replace with the address of `_reserve`
  const _provider = "0x3441eabc3EF6f38f095bD219c4dEA5B7AA702b64"; // Replace with the address of `_provider`
  const _baseVariableBorrowRate = 0; // 0% expressed as an integer
  const _variableRateSlope1 = 8000; // 8% expressed as an integer
  const _variableRateSlope2 = 10000; // 100% expressed as an integer
  const _stableRateSlope1 = 1000; // 10% expressed as an integer
  const _stableRateSlope2 = 10000; // 100% expressed as an integer


  const DefaultReserveInterestRateStrategy = await ethers.deployContract("DefaultReserveInterestRateStrategy",
    [
        _reserve,
        _provider,
        _baseVariableBorrowRate,
        _variableRateSlope1,
        _variableRateSlope2,
        _stableRateSlope1,
        _stableRateSlope2
    ]
  );
 

  await DefaultReserveInterestRateStrategy.waitForDeployment();

  console.log(
    `Default Reserve Interest Rate Strategy for ${_reserve} deployed to ${DefaultReserveInterestRateStrategy.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
