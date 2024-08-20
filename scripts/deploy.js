/***
 * Remove this file and scripts folder later, we use ignition/modules to deploy contracts.
 * This file is just in case.
 */

// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
  //Fetch contract to be deployed
  const VoterToken = await ethers.getContractFactory("VoterToken");
  
  //Deploy the contract
  const voterToken = await VoterToken.deploy();
  await voterToken.deployed();

  console.log(`voterToken deployed to: ${voterToken.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });