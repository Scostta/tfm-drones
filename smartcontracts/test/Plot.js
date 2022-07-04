const Plot = artifacts.require("Plot");
const utils = require("./helpers/utils");

const ownerName = "Sergio";
const allowedMaxFlightAltitude = 100;
const allowedMinFlightAltitude = 50;
const acceptedPesticide = "pesticide A";

contract("Plot", (accounts) => {
  let [acc1, acc2] = accounts;
  let contractInstance;
  beforeEach(async () => {
    contractInstance = await Plot.new();
  });
  it("should be able to create a new plot", async () => {
    const result = await contractInstance.mintNewPlot(
      ownerName,
      allowedMaxFlightAltitude,
      allowedMinFlightAltitude,
      acceptedPesticide,
      { from: acc1 }
    );
    assert.equal(result.receipt.status, true);
    assert.equal(result.logs[0].args.to, acc1);
  });
});
