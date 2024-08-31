# Voter Coin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

For Solidity version 0.8.24 is used.

For communication with Blockchain Ether.js version 6.13.2 and Hardhat version 2.22.8 are used.

## Local testing of this DApp

### Cmd to run local ethereum node
`npx hardhat node`

### Cmd to compile .sol files
`npx hardhat compile`

### Deploy contract via ignition
`npx hardhat ignition deploy ./ignition/modules/ReusableVotingContract.ts --network localhost`

### Deploy contract via scripts
`npx hardhat run --network localhost ./scripts/0_deploy.js`

### To populate blockchain with test data via scripts

`npx hardhat run --network localhost ./scripts/1_seed_data.js`

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Details about contract

getAllVotingEvents()
- summaries
  - votingEvent
    - topic
    - options
    - votingActive
    - exists

## App UI design

![drawio design](./docs/voter-coin-dapp-docs.drawio.svg)


