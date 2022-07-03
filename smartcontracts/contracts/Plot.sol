// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

import "./PlotNFT.sol";

contract Plot is PlotNFT {
    function getPlotsByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 plotBalance = balanceOf(_owner);
        uint256[] memory result = new uint256[](plotBalance);
        uint256 counter = 0;
        for (uint256 i = 0; i < plots.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getPlots() external view returns (Plot[] memory) {
        return plots;
    }

    function getPlot(uint256 _index) external view returns (Plot memory) {
        return plots[_index];
    }
}
