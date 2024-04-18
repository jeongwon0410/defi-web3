import { ethers } from "hardhat";

async function main() {
  const oracle = await ethers.deployContract("SupraPriceOracle");

  await oracle.waitForDeployment();

  console.log(
    `Oracle deployed to ${oracle.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
