/***
 * Remove this file and scripts folder later, we use ignition/modules to deploy contracts.
 * This file is just in case.
 */

// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
  //Fetch contract to be deployed
  const reusableVotingContract = await ethers.getContractFactory("ReusableVotingContract");
  
  //Deploy the contract
  const reusableVotingContractDeployment = await reusableVotingContract.deploy();
  // await reusableVotingContractDeployment.deployed();

  console.log(`reusableVotingContractDeployment deployed to: ${reusableVotingContractDeployment.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });