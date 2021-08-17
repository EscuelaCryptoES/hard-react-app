// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Storage", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let SimpleStorage;
  let simpleStorageInstance;
  let account;


  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const[account] = await ethers.getSigners();

    // To deploy our contract, we just have to call SimpleStorage.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    simpleStorageInstance = await SimpleStorage.deploy();
    await simpleStorageInstance.deployed();

    // We can interact with the contract by calling `simpleStorageInstance.method()`
    await simpleStorageInstance.deployed();
  });


  // You can nest describe calls to create subsections.
  describe("This storage test", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    it("...should store the value 89.", async () => {

        const storedValue = 89;
        
        // Set value
        await simpleStorageInstance.set(storedValue, { from: account });

        // Get stored value
        const storedData = await simpleStorageInstance.get.call();

        expect(storedData).to.equal(storedValue);
    });
  });
});