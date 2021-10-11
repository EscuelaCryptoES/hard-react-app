require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
  },
  solidity: "0.7.3"
};
