pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
// Depending on the requirement, you may build one or more data structures given below. 

interface ISupraOraclePull {

    /// @notice Verified price data
    struct PriceData {
        // List of pairs
        uint256[] pairs;
        // List of prices
        // prices[i] is the price of pairs[i]
        uint256[] prices;
    }

    function verifyOracleProof(bytes calldata _bytesproof) 
    external 
    returns (PriceData memory);
}