const fs = require("fs");

const NFTMarketplace = artifacts.require("NFTMarketplace");

module.exports = function(deployer) {
    deployer.deploy(NFTMarketplace)
      .then(() => NFTMarketplace.deployed())
      .then(_instance => {
          fs.writeFileSync(
            "../app/src/config.js",
            `export const marketplaceAddress = "${_instance.address}"; export const networkURL = "http://127.0.0.1:7545";`
          );
      })
      .catch((error) => {
          console.error(error);
          process.exit(1);
      });
};
