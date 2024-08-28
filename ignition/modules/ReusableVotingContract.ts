const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports =  buildModule("ReusableVotingContractModule", (m: any) => {
  const reusableVotingContract = m.contract("ReusableVotingContract");

  console.log("Contract Name: ",reusableVotingContract.contractName);

  return { reusableVotingContract };
});