import { ethers } from "hardhat";
import { LendingPoolAddressesProvider, LendingPoolConfigurator, 
    LendingPoolCore, LendingPoolParametersProvider, 
    LendingPool, LendingPoolDataProvider,
    LendingPoolLiquidationManager, FeeProvider } from "../../typechain-types";

async function main() {
  try {

    //Contract Addresses
    const LendingPoolAddressProviderAddress  = "0x3441eabc3EF6f38f095bD219c4dEA5B7AA702b64";
    const LendingPoolAddress = "0x805ba2Cbac351fE47Eedb6B759d4A474d45c4b36";
    const LendingPoolParametersProviderAddress  = "0x696d94b60ac0B7afDdd8376596DC9c5f939BB225";
    const LendingPoolCoreAddress  = "0x36a27e74Ed46A5C0943B27908bAc58834072644A";
    const LendingPoolConfiguratorAddress  = "0x3220774088a008105c4d8aac7feF32209808F77d";
    const LendingPoolDataProviderAddress  = "0x90B8f826272bBF78Ab087573C789F2d9ae82C1D7";
    const FeeProviderAddress  = "0x113f8c5C2C1C1Fc9AcC0Ea817757EDb9c62D37Be";
    const LendingPoolLiquidationManagerAddress  = "0x684025Cd7783fC6EF2243251Dd841AFADAfC8b2c";
    
    // Connect to the deployed contract
    const LendingPoolAddressesProvidercontract: LendingPoolAddressesProvider = await ethers.getContractAt('LendingPoolAddressesProvider', LendingPoolAddressProviderAddress);
    const LendingPoolAddresscontract: LendingPool = await ethers.getContractAt('LendingPool', LendingPoolAddress);
    const LendingPoolParametersProviderContract: LendingPoolParametersProvider = await ethers.getContractAt('LendingPoolParametersProvider', LendingPoolParametersProviderAddress);
    const LendingPoolCoreContract: LendingPoolCore = await ethers.getContractAt('LendingPoolCore', LendingPoolCoreAddress);
    const LendingPoolConfiguratorContract: LendingPoolConfigurator = await ethers.getContractAt('LendingPoolConfigurator', LendingPoolConfiguratorAddress);
    const LendingPoolDataProviderContract: LendingPoolDataProvider = await ethers.getContractAt('LendingPoolDataProvider', LendingPoolDataProviderAddress);
    const FeeProviderContract: FeeProvider = await ethers.getContractAt('FeeProvider', FeeProviderAddress);
    
    //initialize Pool
     await LendingPoolAddresscontract.initialize(LendingPoolAddressProviderAddress);
     await LendingPoolParametersProviderContract.initialize(LendingPoolAddressProviderAddress);
     await LendingPoolCoreContract.initialize(LendingPoolAddressProviderAddress);
     await LendingPoolConfiguratorContract.initialize(LendingPoolAddressProviderAddress);
     await LendingPoolDataProviderContract.initialize(LendingPoolAddressProviderAddress);
     await FeeProviderContract.initialize(LendingPoolAddressProviderAddress);
     await LendingPoolAddressesProvidercontract.setLendingPoolLiquidationManager(LendingPoolLiquidationManagerAddress);
     await LendingPoolAddressesProvidercontract.setLendingPoolManager("0x5e9DdBb4a261955bDE2d5373da5726b0dBa60283");
     await LendingPoolAddressesProvidercontract.setTokenDistributor("0x5e9DdBb4a261955bDE2d5373da5726b0dBa60283");
     
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();