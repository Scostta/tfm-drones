// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

import "./models/JobModel.sol";
import "./models/DroneModel.sol";
import "./models/PlotModel.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface DroneInterface is DroneModel {
    function getDrone(uint256 _index) external view returns (Drone memory);
}

interface PlotInterface is PlotModel {
    function getPlot(uint256 _index) external view returns (Plot memory);
}

contract Manager is JobModel, PlotModel, DroneModel, Ownable {
    DroneInterface droneContract;
    PlotInterface plotContract;
    uint256 private jobId;

    mapping(address => bool) public isCompany;

    constructor() {
        jobId = 0;
        droneContract = DroneInterface(
            address(0x44E6106733Ba7cbf2ab3B29b20E2d7957689D4b0)
        );
        plotContract = PlotInterface(
            address(0xD7C53A5aB24D0D5e083f50A2e520859Ccf0Fe76c)
        );
    }

    Job[] public jobs;

    modifier onlyCompanyAddress(address _address) {
        require(
            isCompany[_address] == true,
            "No tienes permisos para realizar esta accion"
        );
        _;
    }

    function setCompanyAddress(address _address) external onlyOwner {
        isCompany[_address] = true;
    }

    function deleteCompanyAddress(address _address) external onlyOwner {
        isCompany[_address] = false;
    }

    function setDroneContractAddress(address _address) external onlyOwner {
        droneContract = DroneInterface(_address);
    }

    function setPlotContractAddress(address _address) external onlyOwner {
        plotContract = PlotInterface(_address);
    }

    function getJobs() external view returns (Job[] memory) {
        return jobs;
    }

    function setPendingJob(uint256 _droneId, uint256 _plotId) public {
        Plot memory currentPlot = plotContract.getPlot(_plotId);
        Drone memory currentDrone = droneContract.getDrone(_droneId);
        require(msg.sender == currentPlot.owner);
        require(
            currentPlot.allowedMaxFlightAltitude >=
                currentDrone.maxFlightAltitude
        );
        require(
            currentPlot.allowedMinFlightAltitude <=
                currentDrone.minFlightAltitude
        );

        jobs.push(Job(jobId, _droneId, _plotId, false));
        jobId++;
    }

    function acceptJob(uint256 _jobId, address _address)
        external
        onlyCompanyAddress(_address)
    {
        jobs[_jobId].approved = true;
    }

    function declineJob(uint256 _jobId, address _address)
        external
        onlyCompanyAddress(_address)
    {
        delete jobs[_jobId];
        jobId--;
    }
}
