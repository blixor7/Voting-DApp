import { Injectable } from '@angular/core';
import { ethers, JsonRpcSigner } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { NETWORK, PROVIDER, SIGNER, SIGNER_ADDRESS } from '../../common-data/common-data.keys';
import { CommonDataService } from '../../common-data/common-data.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public ethereum;

  private provider: ethers.AbstractProvider;
  public signer: any;
  public signerAddress: any;
  public network: any;
  public chainId: any;

  private currAccSubject = new BehaviorSubject<any>({});
  currAcc$ = this.currAccSubject.asObservable();

  constructor(private cd: CommonDataService) {
    const {ethereum} = <any>window
    this.ethereum = ethereum
    if (this.ethereum) {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      this.provider = new ethers.BrowserProvider(this.ethereum);
      this.setupListeners();
    } else {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      this.provider = ethers.getDefaultProvider()
      console.error('Ethereum provider not found');
    }
    this.cd.setData(PROVIDER, this.provider);
  }

  public connectWallet = async () => {
    try{
      if(!this.ethereum) return alert("Please install meta mask");
      const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
    }
    catch(e){
       throw new Error("No ethereum object found")
    }
  }

  public checkWalletConnected = async () => {
    try{
      if(!this.ethereum) return alert("Please install meta mask ")
      const accounts = await this.ethereum.request({method: 'eth_accounts'});
      return accounts;
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }

  // this is used in contract service to connect
  public getWalletConnection(){
    try{
      if(!this.ethereum) return alert("Please install meta mask ")
        return this.ethereum;
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }

  /********************************************************************* */

  //check change in wallet account

  private setupListeners() {
    this.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.currAccSubject.next(null);
      } else {
        this.currAccSubject.next(accounts[0]);
      }
    });

    // Optionally, listen for network changes
    this.ethereum.on('networkChanged', (networkId: number) => {
      console.log('Network changed:', networkId);
    });

    // Optionally, listen for chain changes
    this.ethereum.on('chainChanged', (chainId: number) => {
      console.log('Chain changed:', chainId);
    });
  }

  async getSignerAccount(): Promise<JsonRpcSigner> {
    this.signer = await (this.provider as ethers.BrowserProvider).getSigner();
    this.cd.setData(SIGNER, this.signer);

    this.network = await this.provider.getNetwork();
    this.cd.setData(NETWORK, this.network);

    this.signerAddress = await this.signer.getAddress();
    this.cd.setData(SIGNER_ADDRESS, await this.signer.getAddress());

    this.chainId = this.network.chainId;
    
    return this.signer;
  }

  getProvider(){return this.provider;}
  getSigner(){return this.signer;}
  getSignerAddress(){return this.signerAddress;}
  
}
