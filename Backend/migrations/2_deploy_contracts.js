var Eber = artifacts.require("./Eber.sol");

module.exports = function(deployer) {
  deployer.deploy(Eber, "0xcf1f948a3894df2fa3aaf76ae3d6d9a165b5755a", "0x53bcf49133cb9a25892025f9d93fe4dfcd59589e", "0x3ada18924229b677be868f67d4e5648178156ebb", {gas: 4700000});
};
