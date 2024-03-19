import { ethers } from "hardhat";

async function main() {
  const lendingpool = await ethers.deployContract("LendingPool"
  );

  await lendingpool.waitForDeployment();

  console.log(
    `Lending Pool deployed to ${lendingpool.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
