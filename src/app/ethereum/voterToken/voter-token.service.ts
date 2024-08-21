import { Injectable } from '@angular/core';
import { Contract, ethers } from 'ethers';
import { WalletService } from '../wallet/wallet.service';

const abi = require("./../../../../artifacts/contracts/VoterToken.sol/VoterToken.json").abi;

@Injectable({
  providedIn: 'root'
})
export class VoterTokenService {

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
      this.provider = ethers.getDefaultProvider();
      this.network = await this.provider.getNetwork();
      console.log("getDefaultProvider()",this.network);

    } else {

      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      this.provider = new ethers.BrowserProvider(this.walletService.getWalletConnection());
      this.network = await this.provider.getNetwork();
      console.log("BrowserProvider(this.walletService.getWalletConnection())",this.network);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      this.signer = await this.provider.getSigner();
    }

    // If no %%url%% is provided, it connects to the default
    // http://localhost:8545, which most nodes use.
    this.provider = new ethers.JsonRpcProvider();
    this.network = await this.provider.getNetwork();
    console.log("JsonRpcProvider()",this.network);

    // Get write access as an account by getting the signer
    this.signer = await this.provider.getSigner();

    this.getContract();
  }


  getContract = async () => {
    // const abi = JSON.parse(fs.readFileSync('/artifacts/contracts/VoterToken.sol/VoterToken.json', 'utf-8')).abi;

    this.contract = new Contract(
                      "0x5FbDB2315678afecb367f032d93F642f64180aa3", 
                      abi, this.provider)
    console.log("await this.contract.name() ",await this.contract.name())
  }


}
