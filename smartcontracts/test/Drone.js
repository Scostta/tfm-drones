const Drone = artifacts.require("Drone");
const utils = require("./helpers/utils");

const ownerName = "Sergio";
const model = "x100";
const maxFlightAltitude = 300;
const minFlightAltitude = 100;
const pesticides = ["pesticide A"];
const cost = 10;

contract("Drone", (accounts) => {
  let [acc1, acc2] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await Drone.new();
  });
  it("should be able to create a new drone", async () => {
    const result = await contractInstance.mintNewDrone(
      ownerName,
      model,
      maxFlightAltitude,
      minFlightAltitude,
      pesticides,
      cost,
      { from: acc1 }
    );
    assert.equal(result.receipt.status, true);
    assert.equal(result.logs[0].args.to, acc1);
  });
});
