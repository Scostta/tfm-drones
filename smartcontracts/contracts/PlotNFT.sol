// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

import "./models/PlotModel.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PlotNFT is ERC721, PlotModel {
    using Counters for Counters.Counter;
    Counters.Counter private _currentTokenId;

    constructor() ERC721("PLOT", "PLT") {}

    event NewPlotCreated(uint256 id);

    Plot[] public plots;

    function _plotMint(address to) private {
        uint256 currentId = _currentTokenId.current();
        _safeMint(to, currentId);
        _currentTokenId.increment();
        emit NewPlotCreated(currentId);
    }

    function mintNewPlot(
        string memory _ownerName,
        uint256 _allowedMaxFlightAltitude,
        uint256 _allowedMinFlightAltitude,
        string memory _pesticide
    ) external {
        address owner = msg.sender;
        plots.push(
            Plot(
                _currentTokenId.current(),
                _ownerName,
                _pesticide,
                _allowedMaxFlightAltitude,
                _allowedMinFlightAltitude,
                owner
            )
        );
        _plotMint(owner);
    }
}
