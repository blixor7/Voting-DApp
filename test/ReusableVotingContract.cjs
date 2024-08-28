const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReusableVotingContract", function () {

    let VotingContract, votingContract, owner, addr1, addr2, addr3;

    beforeEach(async function () {
        VotingContract = await ethers.getContractFactory("ReusableVotingContract");
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        votingContract = await VotingContract.deploy();
    });

    it("Deployment should check the name of the Contract", async () => {
        expect(await votingContract.name()).to.equal("Reusable Voting Contract");
    });

    it("Deployment should set the correct owner", async function () {
        expect(await votingContract.owner()).to.equal(owner.address);
    });

    it("Should allow the owner to start a voting event", async function () {
        await votingContract.startVotingEvent("Favorite Color", ["Red", "Blue", "Green"]);
        const event = await votingContract.votingEvents(0);
        expect(event.topic).to.equal("Favorite Color");
        //TODO: we can also test all given options present in event's options instance
        expect(event.votingActive).to.be.true;
    });

    it("Should not allow non-owner to start a voting event", async function () {
        await expect(
            votingContract.connect(addr1).startVotingEvent("Favorite Animal", ["Cat", "Dog"])
        ).to.be.revertedWith("Only the owner can perform this action");
    });

    it("Should allow a valid vote", async function () {
        await votingContract.startVotingEvent("Best Fruit", ["Apple", "Banana", "Cherry"]);

        await votingContract.connect(addr1).vote(0, 1);
        const options = await votingContract.getOptions(0);
        expect(options[1].voteCount).to.equal(1);
    });

    it("Should not allow voting on a non-existent event", async function () {
        await expect(
            votingContract.connect(addr1).vote(999, 0)
        ).to.be.revertedWith("Voting event does not exist");
    });

    it("Should not allow voting if the event is inactive", async function () {
        await votingContract.startVotingEvent("Best Fruit", ["Apple", "Banana", "Cherry"]);
        await votingContract.endVoting(0);

        await expect(
            votingContract.connect(addr1).vote(0, 1)
        ).to.be.revertedWith("Voting is not active");
    });

    it("Should not allow a user to vote more than once", async function () {
        await votingContract.startVotingEvent("Best Fruit", ["Apple", "Banana", "Cherry"]);
        await votingContract.connect(addr1).vote(0, 1);

        await expect(
            votingContract.connect(addr1).vote(0, 2)
        ).to.be.revertedWith("You have already voted");
    });

    it("Should correctly end voting", async function () {
        await votingContract.startVotingEvent("Best Fruit", ["Apple", "Banana", "Cherry"]);
        await votingContract.endVoting(0);
        const event = await votingContract.votingEvents(0);
        expect(event.votingActive).to.be.false;
    });

    it("Should correctly return the winner after voting ends", async function () {
        await votingContract.startVotingEvent("Best Fruit", ["Apple", "Banana", "Cherry"]);
        await votingContract.connect(addr1).vote(0, 0);
        await votingContract.connect(addr2).vote(0, 1);
        await votingContract.connect(addr3).vote(0, 1);
        await votingContract.endVoting(0);

        const [winnerName, winnerVoteCount] = await votingContract.getResults(0);
        expect(winnerName).to.equal("Banana");
        expect(winnerVoteCount).to.equal(2);
    });

    it("Should not allow retrieving results while voting is active", async function () {
        await votingContract.startVotingEvent("Best Fruit", ["Apple", "Banana", "Cherry"]);

        await expect(
            votingContract.getResults(0)
        ).to.be.revertedWith("Voting is still active");
    });

    it("Should return the correct options for an event", async function () {
        await votingContract.startVotingEvent("Favorite Animal", ["Cat", "Dog", "Elephant"]);

        const options = await votingContract.getOptions(0);
        expect(options.length).to.equal(3);
        expect(options[0].name).to.equal("Cat");
        expect(options[1].name).to.equal("Dog");
        expect(options[2].name).to.equal("Elephant");
    });
});
