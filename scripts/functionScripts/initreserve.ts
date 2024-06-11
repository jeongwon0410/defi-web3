import { ethers } from "hardhat";
import { BigNumberish } from "ethers";
import { LendingPoolConfigurator } from "../../typechain-types";

async function main() {
  try {

    //Contract Addresse
    const LendingPoolConfiguratorAddress  = "0x3220774088a008105c4d8aac7feF32209808F77d";

    //for ETH
    const _reserve = "0x4200000000000000000000000000000000000001";
    // const _aTokenName = "Wrapped Ether";
    // const  aTokenSymbol = "WETH";
    const reserveDecimals:BigNumberish = 18; 
    const DefaultReserveInterestRateStrategy = "0xF3Ee421CE59B0C6C90a3580468E1254A497c56e6";
    // const OracleID = 211;
    const OracleID: BigNumberish = 211;


    // Connect to the deployed contract
    const LendingPoolConfiguratorContract: LendingPoolConfigurator = await ethers.getContractAt('LendingPoolConfigurator', LendingPoolConfiguratorAddress);
    // Initialize Pool
    const tx = await LendingPoolConfiguratorContract.initReserve(_reserve, 18, DefaultReserveInterestRateStrategy, 211, { gasLimit: 6000000 });
    await tx.wait();

    console.log("Transaction successful!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();