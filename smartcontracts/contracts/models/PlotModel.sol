// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

interface PlotModel {
    struct Plot {
        uint256 id;
        string ownerName;
        string acceptedPesticide;
        uint256 allowedMaxFlightAltitude;
        uint256 allowedMinFlightAltitude;
        address owner;
    }
}
