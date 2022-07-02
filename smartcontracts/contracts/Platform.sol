// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

import "./DroneHelper.sol";
import "./PlotHelper.sol";

contract Platform is DroneHelper, PlotHelper {
    struct Job {
        uint256 droneId;
        uint256 plotId;
    }

    Job[] public jobs;

    function setPendingJob(uint256 _droneId, uint256 _plotId) public {
        Plot storage currentPlot = plots[_plotId];
        Drone storage currentDrone = drones[_droneId];
        require(msg.sender == currentPlot.owner);
        require(
            currentPlot.allowedMaxFlightAltitude >=
                currentDrone.maxFlightAltitude
        );
        require(
            currentPlot.allowedMinFlightAltitude >=
                currentDrone.minFlightAltitude
        );

        jobs.push(Job(_droneId, _plotId));
    }
}
