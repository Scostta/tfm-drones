const Drone = artifacts.require("Drone");

module.exports = function (deployer) {
  deployer.deploy(Drone);
};
