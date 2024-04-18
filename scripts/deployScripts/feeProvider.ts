import { ethers } from "hardhat";

async function main() {
  const FeeProvider = await ethers.deployContract("FeeProvider"
  );

  await FeeProvider.waitForDeployment();

  console.log(
    `Fee Provider deployed to ${FeeProvider.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
