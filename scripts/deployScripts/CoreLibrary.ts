import { ethers } from "hardhat";

async function main() {
  const coreLibrary = await ethers.deployContract("CoreLibrary"
  );

  await coreLibrary.waitForDeployment();

  console.log(
    `Core Library deployed to ${coreLibrary.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
