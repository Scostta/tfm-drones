// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

import "./models/DroneModel.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Drone is ERC721, Ownable, DroneModel {
    using Counters for Counters.Counter;
    Counters.Counter private _currentTokenId;

    constructor() ERC721("Drone", "DRN") {}

    event NewDroneCreated(uint256 id);

    Drone[] public drones;

    function _droneMint(address _to) private {
        uint256 currentId = _currentTokenId.current();
        _safeMint(_to, currentId);
        _currentTokenId.increment();
        emit NewDroneCreated(currentId);
    }

    function mintNewDrone(
        string memory _ownerName,
        string memory _model,
        uint256 _maxFlightAltitude,
        uint256 _minFlightAltitude,
        string[] memory _pesticides,
        uint256 _cost,
        uint8 _velocity
    ) external {
        address owner = msg.sender;
        drones.push(
            Drone(
                _ownerName,
                _model,
                _maxFlightAltitude,
                _minFlightAltitude,
                _pesticides,
                _cost,
                _velocity,
                owner
            )
        );
        _droneMint(owner);
    }
}
