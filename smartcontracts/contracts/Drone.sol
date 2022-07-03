// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

import "./DroneNFT.sol";

contract Drone is DroneNFT {
    function getDronesByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 droneBalance = balanceOf(_owner);
        uint256[] memory result = new uint256[](droneBalance);
        uint256 counter = 0;
        for (uint256 i = 0; i < drones.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    function getDrones() external view returns (Drone[] memory) {
        return drones;
    }

    function getDrone(uint256 _index) external view returns (Drone memory) {
        return drones[_index];
    }
}
