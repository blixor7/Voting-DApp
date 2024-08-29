# Voter Coin Dapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Local testing of this DApp

### Cmd to run local ethereum node
npx hardhat node

### Cmd to compile .sol files
npx hardhat compile

### Deploy contract via ignition
npx hardhat ignition deploy ./ignition/modules/ReusableVotingContract.ts --network localhost

### Deploy contract via scripts
npx hardhat run --network localhost ./scripts/0_deploy.js

npx hardhat run --network localhost ./scripts/1_seed_data_.js


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
