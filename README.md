# Voting DApp

A decentralized voting application built with Angular and Solidity, enabling secure and transparent voting processes on the blockchain.

## Overview

Voting DApp is a full-stack decentralized application that allows users to create voting events, cast votes, and view results in a trustless environment. The application leverages smart contracts on the Ethereum blockchain to ensure vote integrity and transparency.

## Technology Stack

- **Frontend**: Angular CLI version 18.0.7
- **Smart Contracts**: Solidity version 0.8.24
- **Blockchain Interaction**: Ethers.js version 6.13.2
- **Development Framework**: Hardhat version 2.22.8

## Smart Contract Features

- Create and manage multiple voting events
- Vote on active events with secure transaction handling
- Real-time results tracking
- Admin controls for event management
- Immutable vote recording on the blockchain

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MetaMask wallet browser extension
- Local Ethereum node (via Hardhat)

### Installation and Testing

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voting-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local Ethereum node**
   ```bash
   npx hardhat node
   ```

4. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

5. **Deploy contracts (using Ignition)**
   ```bash
   npx hardhat ignition deploy ./ignition/modules/ReusableVotingContract.ts --network localhost
   ```

   **Alternative deployment (using scripts)**
   ```bash
   npx hardhat run --network localhost ./scripts/0_deploy.js
   ```

6. **Seed test data**
   ```bash
   npx hardhat run --network localhost ./scripts/1_seed_data.js
   ```

7. **Start development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` to access the application.

## Contract Methods

- `getAllVotingEvents()` - Retrieve all voting events
- Event summaries and details
- Voting status checks (`votingActive`, `exists`)
- Topic and option management

## Application Architecture

### Frontend Design
- Responsive UI built with Angular
- Real-time connection to blockchain via Ethers.js
- Dynamic state management for account changes
- Admin interface for event creation and management

### Services Structure
- **Wallet Service**: Handles wallet connections, account management, and network interactions
- **Contract Service**: Manages all smart contract interactions and blockchain communications

## Features

- ✅ Real-time account switching detection and state updates
- ✅ Admin capabilities for creating new voting events
- ✅ Editable voting event titles and topics
- ✅ Live results display when voting concludes
- ✅ Secure voting mechanism for existing events
- ✅ Clean separation of concerns between wallet and contract services

## Project Structure

```
voting-dapp/
├── contracts/           # Solidity smart contracts
├── ignition/           # Deployment modules
├── scripts/            # Deployment and seeding scripts
├── src/
│   ├── app/
│   │   ├── services/   # Wallet and contract services
│   │   └── components/ # UI components
│   └── assets/         # Design files and diagrams
└── hardhat.config.js   # Hardhat configuration
```

## Future Enhancements

- Multi-network support
- Gas optimization improvements
- Advanced voting mechanisms (quadratic voting, etc.)
- Mobile application version
- Integration with IPFS for decentralized storage

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is licensed under the MIT License.
