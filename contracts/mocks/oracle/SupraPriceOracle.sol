pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "../../interfaces/ISupraSValueFeed.sol";
import "../../utils/Ownable.sol";

contract SupraPriceOracle is Ownable {

    ISupraSValueFeed internal sValueFeed;

    constructor(ISupraSValueFeed _sValueFeed) public {
        sValueFeed = _sValueFeed; 
    }

    function getSupraSvalueFeed() external view returns(ISupraSValueFeed) {
        return sValueFeed;
    }

    function getPrice(uint256 _priceIndex) external view returns (ISupraSValueFeed.priceFeed memory) {
        return sValueFeed.getSvalue(_priceIndex);
    }

    function updateSupraSvalueFeed(ISupraSValueFeed _newSValueFeed) external onlyOwner {
        sValueFeed = _newSValueFeed;
    }
}
