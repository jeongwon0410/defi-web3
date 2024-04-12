pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
// Depending on the requirement, you may build one or more data structures given below. 

interface ISupraSValueFeed {

    // Data structure to hold the pair data
    struct priceFeed {
        uint256 price;
    }


    // Function to retrieve the data for a single data pair
    function getSvalue(uint256 _pairIndex)
        external 
        view
        returns (priceFeed memory);

}
