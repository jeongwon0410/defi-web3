import { ethers } from "hardhat";

async function main() {
  const lendingpoolcore = await ethers.deployContract("LendingPoolCore" , {
    libraries: {
      CoreLibrary: '0x62ff0a843AA79B333F8f0fb1358CB430fd20E788',
    },
  });

  await lendingpoolcore.waitForDeployment();

  console.log(
    `Lending Pool deployed to ${lendingpoolcore.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
