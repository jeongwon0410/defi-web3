import { ethers } from "hardhat";

async function main() {
  const lendingPoolParametersProvider = await ethers.deployContract("LendingPoolParametersProvider"
  );

  await lendingPoolParametersProvider.waitForDeployment();

  console.log(
    `Lending Pool deployed to ${lendingPoolParametersProvider.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
