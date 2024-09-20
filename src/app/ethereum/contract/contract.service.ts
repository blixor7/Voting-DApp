import { Injectable } from '@angular/core';
import { Contract, BigNumberish, ethers, getUint } from 'ethers';
import { WalletService } from '../wallet/wallet.service';

import { CommonDataService } from '../../common-data/common-data.service';
import { CHAIN_ID, CONTRACT, CONTRACT_ADDRESS, CONTRACT_OWNER, NETWORK, PROVIDER, SIGNER, SIGNER_ADDRESS, VOTING_EVENTS_LIST } from '../../common-data/common-data.keys';
import { from, Observable, of } from 'rxjs';

const config = require('./../../../../config.json');
// const { chainId } = await ethers.provider.getNetwork()

const VoterTokenabi = require("./../../../../artifacts/contracts/VoterToken.sol/VoterToken.json").abi;
const ReusableVotingContractabi = require("./../../../../artifacts/contracts/ReusableVotingContract.sol/ReusableVotingContract.json").abi;
const addressForContractDeployment = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  // public provider: any;
  // public signer: any;
  // public signerAddress: any;
  // public network: any;
  // public chainId: any;
  public contract: any;
  public contractOwnerAddress: any;

  constructor(
    private ws: WalletService,
    private cd: CommonDataService
  ) {
    // this.provider = null;
    // this.signer = null;
    // this.network = null;
    this.ws.getSignerAccount();
    this.contract = null;

    this.setupEthereumConnection();
  }

  setupEthereumConnection = async() => {

    await this.connectWithGivenProvider(
      this.ws.getProvider(),addressForContractDeployment,ReusableVotingContractabi);

    // if (this.ws.getWalletConnection() == null) {
    //   // If MetaMask is not installed, we use the default provider,
    //   // which is backed by a variety of third-party services (such
    //   // as INFURA). They do not have private keys installed,
    //   // so they only have read-only access
    //   console.log("MetaMask not installed; using read-only defaults")
    //   await this.connectWithDefaultProvider();

    // } else {
    //   // Connect to the MetaMask EIP-1193 object. This is a standard
    //   // protocol that allows Ethers access to make all read-only
    //   // requests through MetaMask.
    //   await this.connectWithBrowserProvider();
    // }

    // If no %%url%% is provided, it connects to the default
    // http://localhost:8545, which most nodes use.
    // await this.connectWithJsonRpcProvider();

    this.ws.currAcc$.subscribe(currAccChanged => {
      this.ws.getSignerAccount();
    })
  }

  
  connectWithDefaultProvider = async () => {
    await this.connectWithGivenProvider(
      ethers.getDefaultProvider(),addressForContractDeployment,ReusableVotingContractabi);
    console.log("Default Provider");
  }

  connectWithBrowserProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.BrowserProvider(this.ws.getWalletConnection()),
      addressForContractDeployment,ReusableVotingContractabi);
    console.log("Browser Provider");
  }

  connectWithJsonRpcProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.JsonRpcProvider(),
      addressForContractDeployment,ReusableVotingContractabi);
    console.log("JsonRpc Provider");
  }

  async connectWithGivenProvider(
      provider: any, 
      address: string, 
      abi: ethers.Interface | ethers.InterfaceAbi
  ) {
    // this.provider = provider;
    // this.network = await this.provider.getNetwork();
    // this.signer = await this.provider.getSigner();
    // this.signerAddress = await this.signer.getAddress();
    // this.chainId = this.network.chainId;

    await this.setupAllConnectionDetails();

    this.contract = new Contract(address, abi, provider);

    // console.log("Chain Id", this.chainId);

    await this.fetchAndSaveAllData();
  }

  async setupAllConnectionDetails(){
    
    // this.network = await this.provider.getNetwork();
    // this.signer = await this.provider.getSigner();
    // this.signerAddress = await this.signer.getAddress();
    // this.chainId = this.network.chainId;

    // this.contract = new Contract(address, abi, this.provider);
  }


  async fetchAndSaveAllData(){
    //store data in common data service
    // this.commonData.setData(PROVIDER, this.provider);

    // this.commonData.setData(NETWORK, this.network);
    // this.commonData.setData(CHAIN_ID, this.chainId);

    // this.commonData.setData(SIGNER, this.signer);
    // this.commonData.setData(SIGNER_ADDRESS, await this.signer.getAddress());

    this.cd.setData(CONTRACT, this.contract);
    this.cd.setData(CONTRACT_ADDRESS, await this.contract.getAddress());
    this.cd.setData(CONTRACT_OWNER, await this.contract.owner());

    this.cd.setData(VOTING_EVENTS_LIST, await this.contract.getAllVotingEvents());
    this.cd.getAllData().subscribe(data => {
      console.log("STATE: ",data);
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
            .endVoting(eventIdNo,{nonce:currentNonce})
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

  // async clearStuckTransactions(nonce: number){
  //   try {
  //     // Create a transaction to cancel the pending one
  //     const tx = {
  //         to: await this.signer.getAddress(), // Send to your own address
  //         value: ethers.parseUnits('0', 'wei'), // Zero value to cancel
  //         nonce: nonce, // Use the nonce of the transaction you want to cancel
  //         gasLimit: 21000, // Basic gas limit for a simple transaction
  //         gasPrice: ethers.parseUnits('1000', 'gwei') // Higher gas price to ensure it is mined
  //     };

  //     // Send the cancellation transaction
  //     const txResponse = await this.signer.sendTransaction(tx);
  //     console.log('Cancel transaction hash:', txResponse.hash);

  //     // Wait for the transaction to be mined
  //     const txReceipt = await txResponse.wait();
  //     console.log('Cancel transaction mined:', txReceipt.transactionHash);
  // } catch (error) {
  //     console.error('Error canceling transaction:', error);
  // }
  // }

  /***********************************************************************/


}
