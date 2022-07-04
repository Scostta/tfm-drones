// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

interface DroneModel {
    struct Drone {
        uint256 id;
        string ownerName;
        string model;
        uint256 maxFlightAltitude;
        uint256 minFlightAltitude;
        string[] pesticides;
        uint256 cost;
        address owner;
    }
}
