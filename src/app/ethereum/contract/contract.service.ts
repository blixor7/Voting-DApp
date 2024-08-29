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

  public provider: any;
  public signer: any;
  public signerAddress: any;
  public network: any;
  public chainId: any;
  public contract: any;
  public contractOwnerAddress: any;

  constructor(
    private walletService: WalletService,
    private commonData: CommonDataService
  ) {
    this.provider = null;
    this.signer = null;
    this.network = null;
    this.contract = null;

    this.setupEthereumConnection();
  }

  setupEthereumConnection = async() => {
    if (this.walletService.getWalletConnection() == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      await this.connectWithDefaultProvider();

    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      await this.connectWithBrowserProvider();
    }

    // If no %%url%% is provided, it connects to the default
    // http://localhost:8545, which most nodes use.
    // await this.connectWithJsonRpcProvider();
  }

  // async presetup(provider: any){
  //   this.provider = provider;
  //   this.network = await this.provider.getNetwork();
  //   this.signer = await this.provider.getSigner();
  //   this.signerAddress = await this.signer.getAddress();
  //   this.chainId = this.network.chainId;
  //   console.log(this.chainId)
  // }

  async connectWithGivenProvider(
      provider: any, 
      address: string, 
      abi: ethers.Interface | ethers.InterfaceAbi
  ) {
    this.provider = provider;
    this.network = await this.provider.getNetwork();
    this.signer = await this.provider.getSigner();
    this.signerAddress = await this.signer.getAddress();
    // this.chainId = this.network.chainId;

    this.contract = new Contract(address, abi, this.provider);


    //store data in common data service
    this.commonData.setData(PROVIDER, this.provider);
    this.commonData.setData(NETWORK, this.network);
    this.commonData.setData(SIGNER, this.signer);
    this.commonData.setData(SIGNER_ADDRESS, await this.signer.getAddress());
    
    //store data in common data service
    this.commonData.setData(PROVIDER, this.provider);
    this.commonData.setData(NETWORK, this.network);
    this.commonData.setData(SIGNER, this.signer);
    this.commonData.setData(SIGNER_ADDRESS, await this.signer.getAddress());

    console.log("Chain Id", this.chainId);
    // if(this.chainId.charAt(this.chainId.length-1)==='n'){
    //   this.chainId = this.chainId.slice(0,this.chainId.length-1);
    // }

    await this.fetchAndSaveAllData();

    // provider.on('accountsChanged', (accounts: any) => {
    //   console.log('Accounts changed:', accounts);
    // });


    // console.log("Provider", this.network);
    // console.log("Chain Id", this.network.chainId);
    // console.log("Signer address:", await this.signer.getAddress());
    // console.log("Contract Name ",await this.contract.name());
    // console.log("Contract Address ",await this.contract.getAddress());
    // console.log("Owner Address ",await this.contract.owner());
  }

  connectWithDefaultProvider = async () => {
    await this.connectWithGivenProvider(
      ethers.getDefaultProvider(),addressForContractDeployment,ReusableVotingContractabi);
    console.log("Default Provider");
  }

  connectWithBrowserProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.BrowserProvider(this.walletService.getWalletConnection()),
      addressForContractDeployment,ReusableVotingContractabi);
    console.log("Browser Provider");
  }

  connectWithJsonRpcProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.JsonRpcProvider(),
      addressForContractDeployment,ReusableVotingContractabi);
    console.log("JsonRpc Provider");
  }

  async fetchAndSaveAllData(){
    //store data in common data service
    this.commonData.setData(PROVIDER, this.provider);

    this.commonData.setData(NETWORK, this.network);
    this.commonData.setData(CHAIN_ID, this.chainId);

    this.commonData.setData(SIGNER, this.signer);
    this.commonData.setData(SIGNER_ADDRESS, await this.signer.getAddress());

    this.commonData.setData(CONTRACT, this.contract);
    this.commonData.setData(CONTRACT_ADDRESS, await this.contract.getAddress());
    this.commonData.setData(CONTRACT_OWNER, await this.contract.owner());

    this.commonData.setData(VOTING_EVENTS_LIST, await this.contract.getAllVotingEvents());
  }

  /***********************************************************************/
  /*** All Readonly Operations on Smart Contract ***/
   getAllVotingEvents(): any {
    return this.contract.getAllVotingEvents();
  }

  stopVoting(eventId: any) {
    console.log("stopping eventId ", eventId);
    const eventIdNo: BigNumberish = eventId;

    try {
        this.contract.connect(this.signer)
            .endVoting(eventIdNo)
            .then(() => {
                // Handle successful endVoting
                console.log("Voting ended successfully");
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

  /***********************************************************************/


}
