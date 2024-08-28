import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';
import { WalletService } from '../wallet/wallet.service';
import { from, Observable } from 'rxjs';

const VoterTokenabi = require("./../../../../artifacts/contracts/VoterToken.sol/VoterToken.json").abi;
const ReusableVotingContractabi = require("./../../../../artifacts/contracts/ReusableVotingContract.sol/ReusableVotingContract.json").abi;


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  public provider: any;
  public signer: any;
  public network: any;
  public contract: any;

  constructor(private walletService: WalletService) {
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

    this.getContract("0x5FbDB2315678afecb367f032d93F642f64180aa3", 
      ReusableVotingContractabi);
  }

  connectWithDefaultProvider = async () => {
    this.provider = ethers.getDefaultProvider();
    this.network = await this.provider.getNetwork();
    console.log("getDefaultProvider()",this.network);

    this.signer = await this.provider.getSigner();
    console.log("Signer address:", await this.signer.getAddress());
  }

  connectWithBrowserProvider = async () => {
    this.provider = new ethers.BrowserProvider(this.walletService.getWalletConnection());
    this.network = await this.provider.getNetwork();
    console.log("BrowserProvider(this.walletService.getWalletConnection())",this.network);

    // It also provides an opportunity to request access to write
    // operations, which will be performed by the private key
    // that MetaMask manages for the user.
    this.signer = await this.provider.getSigner();
    console.log("Signer address:", await this.signer.getAddress());

    return this.signer;
  }

  connectWithJsonRpcProvider = async () => {
    this.provider = new ethers.JsonRpcProvider();
    this.network = await this.provider.getNetwork();
    console.log("JsonRpcProvider()",this.network);

    this.provider.getNetwork().then((network: { name: any; }) => {
      console.log('Connected to network:', network.name);
    });

    // Get write access as an account by getting the signer
    this.signer = await this.provider.getSigner();
    console.log("Signer address:", await this.signer.getAddress());
  }

  getContract = async (address: string, abi: ethers.Interface | ethers.InterfaceAbi) => {
    this.contract = new Contract(address, abi, this.provider)
    console.log("Contract Name ",await this.contract.name())
    console.log("Contract Address ",await this.contract.getAddress())
    console.log("Owner Address ",await this.contract.owner())

    return this.contract;
  }

  getLoggedInAccount() : Observable<any>{
    return from(this.signer.getAddress());
  }
}
