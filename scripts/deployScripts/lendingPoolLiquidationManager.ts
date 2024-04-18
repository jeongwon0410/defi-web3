

import { ethers } from "hardhat";

async function main() {
  const LendingPoolLiquidationManager = await ethers.deployContract("LendingPoolLiquidationManager"
  );

  await LendingPoolLiquidationManager.waitForDeployment();

  console.log(
    `Lending Pool Liquidation Manager deployed to ${LendingPoolLiquidationManager.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
