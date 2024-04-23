import { ethers } from "hardhat";

async function main() {
  const lendingRateOracle = await ethers.deployContract("LendingRateOracle"
  );

  await lendingRateOracle.waitForDeployment();

  console.log(
    `lending Rate Oracle deployed to ${lendingRateOracle.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
