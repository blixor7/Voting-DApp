import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';
import { WalletService } from '../wallet/wallet.service';
import { from, Observable } from 'rxjs';

import { CommonDataService } from '../../common-data/common-data.service';
import { CONTRACT, NETWORK, PROVIDER, SIGNER } from '../../common-data/common-data-keys';
import { SIGNAL } from '@angular/core/primitives/signals';

const VoterTokenabi = require("./../../../../artifacts/contracts/VoterToken.sol/VoterToken.json").abi;
const ReusableVotingContractabi = require("./../../../../artifacts/contracts/ReusableVotingContract.sol/ReusableVotingContract.json").abi;
const addressForContractDeployment = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public provider: any;
  public signer: any;
  public network: any;
  public contract: any;

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

    // this.contract = this.getContract("0x5FbDB2315678afecb367f032d93F642f64180aa3", 
    //   ReusableVotingContractabi);
  }

  async connectWithGivenProvider(
      provider: any, 
      address: string, 
      abi: ethers.Interface | ethers.InterfaceAbi
  ) {
    this.provider = provider;
    this.network = await this.provider.getNetwork();
    this.signer = await this.provider.getSigner();
    this.contract = new Contract(address, abi, this.provider);

    //store data in common data service
    this.commonData.setData(PROVIDER, this.provider);
    this.commonData.setData(NETWORK, this.network);
    this.commonData.setData(SIGNER, this.signer);
    this.commonData.setData(CONTRACT, this.contract);

    console.log("Provider", this.network);
    console.log("Signer address:", await this.signer.getAddress());
    console.log("Contract Name ",await this.contract.name());
    console.log("Contract Address ",await this.contract.getAddress());
    console.log("Owner Address ",await this.contract.owner());
  }

  connectWithDefaultProvider = async () => {

    await this.connectWithGivenProvider(
      ethers.getDefaultProvider(),addressForContractDeployment,ReusableVotingContractabi);
    // this.provider = ethers.getDefaultProvider();
    // this.network = await this.provider.getNetwork();
    // this.signer = await this.provider.getSigner();


    console.log("Default Provider");
  }

  connectWithBrowserProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.BrowserProvider(this.walletService.getWalletConnection()),
      addressForContractDeployment,ReusableVotingContractabi);
    // this.provider = new ethers.BrowserProvider(this.walletService.getWalletConnection());
    // this.network = await this.provider.getNetwork();
    console.log("Browser Provider");

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    // this.signer = await this.provider.getSigner();
    // console.log("Signer address:", await this.signer.getAddress());

    // return this.signer;
  }

  connectWithJsonRpcProvider = async () => {
    await this.connectWithGivenProvider(
      new ethers.JsonRpcProvider(),
      addressForContractDeployment,ReusableVotingContractabi);
    // this.provider = new ethers.JsonRpcProvider();
    // this.network = await this.provider.getNetwork();
    console.log("JsonRpc Provider");

    // this.provider.getNetwork().then((network: { name: any; }) => {
    //   console.log('Connected to network:', network.name);
    // });

    // Get write access as an account by getting the signer
    // this.signer = await this.provider.getSigner();
    // console.log("Signer address:", await this.signer.getAddress());
  }

  getContract = async (address: string, abi: ethers.Interface | ethers.InterfaceAbi) => {
    this.contract = new Contract(address, abi, this.provider)
    console.log("Contract Name ",await this.contract.name())
    console.log("Contract Address ",await this.contract.getAddress())
    console.log("Owner Address ",await this.contract.owner())

    // return this.contract;
  }

  // getLoggedInAccount() : Observable<any>{
  //   return from(this.signer.getAddress());
  // }
}
