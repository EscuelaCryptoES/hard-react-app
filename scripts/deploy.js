// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  
  await token.deployed();
  await simpleStorage.deployed();

  console.log("Token address:", token.address);
  console.log("SimpleStorage address:", simpleStorage.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFilesT(token);
  saveFrontendFilesSS(simpleStorage);
}

function saveFrontendFilesT(token, simplestorage) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address-token.json",
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    contractsDir + "/Token.json",
    JSON.stringify(TokenArtifact, null, 2)
  );
}

function saveFrontendFilesSS(simpleStorage) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address-simplestorage.json",
    JSON.stringify({ SimpleStorage: simpleStorage.address }, undefined, 2)
  );

  const SimpleStorageArtifact = artifacts.readArtifactSync("SimpleStorage");

  fs.writeFileSync(
    contractsDir + "/SimpleStorage.json",
    JSON.stringify(SimpleStorageArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
