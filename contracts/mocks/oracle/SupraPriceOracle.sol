pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "../../interfaces/ISupraOraclePull.sol";
import "../../utils/Ownable.sol";

contract SupraPriceOracle is Ownable {

    ISupraOraclePull internal oracle;

    //For kroma Testnet for Pull Oracle
    constructor() public {
        oracle = ISupraOraclePull(0x94d5Cb2dFDd0F2bBf8d07fE673f5334d09F0c901); 
    }

    function GetPairPrice(bytes calldata _bytesProof, uint256 pair) external                 
    returns(uint256){
        ISupraOraclePull.PriceData memory prices = 
        oracle.verifyOracleProof(_bytesProof);
        uint256 price = 0;
        for (uint256 i = 0; i < prices.pairs.length; i++) {
            if (prices.pairs[i] == pair) {
                price = prices.prices[i];
                break;
            }
        }
        require(price != 0, "Pair not found");
        return price;
    }

    function updatePullAddress(ISupraOraclePull oracle_) 
    external 
    onlyOwner {
        oracle = oracle_;
    }
}
