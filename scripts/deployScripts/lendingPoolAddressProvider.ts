import { ethers } from "hardhat";

async function main() {
  const lendingPoolAddressprovider = await ethers.deployContract("LendingPoolAddressesProvider"
  );

  await lendingPoolAddressprovider.waitForDeployment();

  console.log(
    `Lending Pool deployed to ${lendingPoolAddressprovider.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
