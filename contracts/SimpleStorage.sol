// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "hardhat/console.sol";

contract SimpleStorage {
  uint256 storedData;

  function set(uint256 x) public {
    console.log("Valor almacenado");
    storedData = x;
  }

  function get() public view returns (uint256) {
    console.log("Recuperando valor");
    return storedData;
  }
}