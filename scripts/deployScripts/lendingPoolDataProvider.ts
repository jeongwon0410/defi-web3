import { ethers } from "hardhat";

async function main() {
  const lendingPoolDataProvider = await ethers.deployContract("LendingPoolDataProvider"
  );

  await lendingPoolDataProvider.waitForDeployment();

  console.log(
    `lending Pool Data Provider  deployed to ${lendingPoolDataProvider.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
