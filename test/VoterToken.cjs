const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", () => {
  it("Deployment should check the name of the Contract - way #1", async () => {
    const voterTokenContract = await ethers.getContractFactory("VoterToken");
    const voterToken = await voterTokenContract.deploy();
    // await voterToken.deployed(); // deployed() is not a function
    expect(await voterToken.name()).to.equal("Voter Token");
  });

  it("Deployment should check the name of the Contract - way #2", async () => {
    const hardhatToken = await ethers.deployContract("VoterToken");
    expect(await hardhatToken.name()).to.equal("Voter Token");
  });
});