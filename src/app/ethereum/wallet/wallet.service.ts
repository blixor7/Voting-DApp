import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public ethereum;

  constructor() {
    const {ethereum} = <any>window
    this.ethereum = ethereum
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

  public getWalletConnection(){
    try{
      if(!this.ethereum) return alert("Please install meta mask ")
        return this.ethereum;
    }
    catch(e){
      throw new Error("No ethereum object found");
    }
  }
}
