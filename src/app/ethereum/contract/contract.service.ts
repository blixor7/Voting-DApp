import { Injectable } from '@angular/core';
import { Contract, BigNumberish, ethers, getUint } from 'ethers';
import { WalletService } from '../wallet/wallet.service';

import { CommonDataService } from '../../common-data/common-data.service';
import { CHAIN_ID, CONTRACT, CONTRACT_ADDRESS, CONTRACT_OWNER, NETWORK, PROVIDER, SIGNER, SIGNER_ADDRESS, VOTING_EVENTS_LIST } from '../../common-data/common-data.keys';
import { from, Observable, of } from 'rxjs';

const config = require('./../../../../config.json');

const VoterTokenabi = require("./../../../../artifacts/contracts/VoterToken.sol/VoterToken.json").abi;
const ReusableVotingContractabi = require("./../../../../artifacts/contracts/ReusableVotingContract.sol/ReusableVotingContract.json").abi;
const addressForContractDeployment = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public contract: any;
  public contractOwnerAddress: any;

  constructor(
    private ws: WalletService,
    private cd: CommonDataService
  ) {
    this.ws.getSignerAccount();
    this.contract = null;
    this.setupEthereumConnection();
  }

  setupEthereumConnection = async () => {

    await this.connectWithGivenProvider(
      this.ws.getProvider(), addressForContractDeployment, ReusableVotingContractabi);

    // If no %%url%% is provided, it connects to the default
    // http://localhost:8545, which most nodes use.
    // await this.connectWithJsonRpcProvider();

    this.ws.currAcc$.subscribe(currAccChanged => {
      this.ws.getSignerAccount();
    })
  }

  connectWithJsonRpcProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.JsonRpcProvider(),
      addressForContractDeployment, ReusableVotingContractabi);
    console.log("JsonRpc Provider");
  }

  async connectWithGivenProvider(
    provider: any,
    address: string,
    abi: ethers.Interface | ethers.InterfaceAbi
  ) {
    this.contract = new Contract(address, abi, provider);

    await this.fetchAndSaveAllData();
  }

  async fetchAndSaveAllData() {
    //store data in common data service
    this.cd.setData(CONTRACT, this.contract);
    this.cd.setData(CONTRACT_ADDRESS, await this.contract.getAddress());
    this.cd.setData(CONTRACT_OWNER, await this.contract.owner());

    this.cd.setData(VOTING_EVENTS_LIST, await this.contract.getAllVotingEvents());
    this.cd.getAllData().subscribe(data => {
      console.log("STATE: ", data);
    })
  }

  /***********************************************************************/
  /*** All Readonly Operations on Smart Contract ***/
  getAllVotingEvents(): any {
    return this.contract.getAllVotingEvents().then((success: any) => {
      // Handle successfully got all voting events
      console.log("Obtained all voting events successfully:", success);
      // Optionally, update your UI or state based on the successful end
    })
      .catch((error: any) => {
        console.error("Error getting all voting events:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }

  async stopVoting(eventId: any) {
    console.log("stopping eventId ", eventId);
    const eventIdNo: BigNumberish = eventId;
    console.log("stopping eventIdNo ", eventIdNo);

    const currentNonce = await this.ws.getProvider().getTransactionCount(this.ws.getSignerAddress());
    const pendingNonce = await this.ws.getProvider().getTransactionCount(this.ws.getSignerAddress(), 'pending');
    console.log('Current nonce:', currentNonce, 'Pending: ', pendingNonce);
    // this.clearStuckTransactions(pendingNonce);
    try {
      this.contract
        .connect(this.ws.getSigner())
        //TODO: clear stuck nonce to remove explicit currentNonce
        .endVoting(eventIdNo, { nonce: currentNonce })
        .then((success: any) => {
          // Handle successful endVoting
          console.log("Voting ended successfully:", success);
          // Optionally, update your UI or state based on the successful end
        })
        .catch((error: any) => {
          console.error("Error ending voting:", error);
          // Handle the error, e.g., display an error message to the user              
        });
    } catch (error) {
      console.error("Error connecting to contract or signer:", error);
      // Handle errors related to connecting to the contract or signer
    }
  }
}
