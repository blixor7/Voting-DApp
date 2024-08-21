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

  async connect(){
    if(!this.ethereum) return alert("Please install meta mask");
    const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
    console.log(accounts[0]);
  }
}
