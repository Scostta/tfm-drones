// SPDX-License-Identifier: UNLICENCED
pragma solidity >=0.4.22 <0.9.0;

interface JobModel {
    struct Job {
        uint256 id;
        uint256 droneId;
        uint256 plotId;
        bool approved;
    }
}
