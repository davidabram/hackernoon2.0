var HackerNoon = artifacts.require("./HackerNoon.sol");

module.exports = function(deployer, network) {
  if (network === 'rinkeby') {
    return
  }

  deployer.deploy(HackerNoon);
};
