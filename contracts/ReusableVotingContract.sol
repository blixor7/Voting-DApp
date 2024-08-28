// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ReusableVotingContract {

    string public name = "Reusable Voting Contract";

    struct Voter {
        bool voted;
        uint8 vote;
    }

    struct Option {
        string name;
        uint256 voteCount;
    }

    struct VotingEvent {
        string topic;
        Option[] options;
        mapping(address => Voter) voters;
        bool votingActive;
        bool exists; //this is set to false for a non exist instead of out of bounds or null pointer in other languages
    }

    address public owner;
    uint256 public eventCount;
    mapping(uint256 => VotingEvent) public votingEvents;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier validEvent(uint256 eventId) {
        require(votingEvents[eventId].exists, "Voting event does not exist");
        _;
    }

    modifier onlyActiveVoting(uint256 eventId) {
        require(votingEvents[eventId].votingActive, "Voting is not active");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function startVotingEvent(string memory _topic, string[] memory _optionNames) external onlyOwner {
        VotingEvent storage newEvent = votingEvents[eventCount];
        newEvent.topic = _topic;
        newEvent.votingActive = true;
        newEvent.exists = true;

        for (uint i = 0; i < _optionNames.length; i++) {
            newEvent.options.push(Option({
                name: _optionNames[i],
                voteCount: 0
            }));
        }

        eventCount++;
    }

    function vote(uint256 eventId, uint8 _optionIndex) external validEvent(eventId) onlyActiveVoting(eventId) {
        VotingEvent storage votingEvent = votingEvents[eventId];

        require(!votingEvent.voters[msg.sender].voted, "You have already voted");
        require(_optionIndex < votingEvent.options.length, "Invalid option index");

        votingEvent.voters[msg.sender].voted = true;
        votingEvent.voters[msg.sender].vote = _optionIndex;

        votingEvent.options[_optionIndex].voteCount += 1;
    }

    function endVoting(uint256 eventId) external onlyOwner validEvent(eventId) {
        votingEvents[eventId].votingActive = false;
    }

    function getResults(uint256 eventId) external view validEvent(eventId) returns (string memory winnerName, uint256 winnerVoteCount) {
        VotingEvent storage votingEvent = votingEvents[eventId];
        require(!votingEvent.votingActive, "Voting is still active");

        uint256 winningVoteCount = 0;
        uint256 winningIndex = 0;

        for (uint i = 0; i < votingEvent.options.length; i++) {
            if (votingEvent.options[i].voteCount > winningVoteCount) {
                winningVoteCount = votingEvent.options[i].voteCount;
                winningIndex = i;
            }
        }

        winnerName = votingEvent.options[winningIndex].name;
        winnerVoteCount = votingEvent.options[winningIndex].voteCount;
    }

    function getOptions(uint256 eventId) external view validEvent(eventId) returns (Option[] memory) {
        return votingEvents[eventId].options;
    }
}
