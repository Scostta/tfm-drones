const Drone = artifacts.require("Drone");
const Plot = artifacts.require("Plot");
const Manager = artifacts.require("Manager");

module.exports = function (deployer) {
  deployer
    .deploy(Drone)
    .then(() =>
      deployer
        .deploy(Plot)
        .then(() => deployer.deploy(Manager, Drone.address, Plot.address))
    );
};
