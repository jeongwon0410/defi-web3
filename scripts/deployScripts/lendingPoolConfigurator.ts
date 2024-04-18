import { ethers } from "hardhat";

async function main() {
  const lendingpoolconfigurator = await ethers.deployContract("LendingPoolConfigurator"
  );

  await lendingpoolconfigurator.waitForDeployment();

  console.log(
    `lending pool configurator  deployed to ${lendingpoolconfigurator.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
