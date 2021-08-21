import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import contractAddress from "../contracts/contract-address.json";
import getWeb3 from "./getWeb3";

import "./css/Dapp.css";

class Dapp extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Hardhat Network ID
      const HARDHAT_NETWORK_ID = '1337';
      // Get the contract instance.
      const deployedNetwork = HARDHAT_NETWORK_ID;
      const contractName = SimpleStorageContract.contractName;

      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && contractAddress[contractName],
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log(contract);
    console.log(accounts);

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();
    console.log(response);
    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="Dapp">
        <h1>Good to Go!</h1>
        <p>Your Hardhat & React Enviroment is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of Dapp.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default Dapp;
