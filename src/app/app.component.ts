import { Component, OnInit } from '@angular/core';
import { WalletService } from './ethereum/wallet/wallet.service';
import { ContractService } from './ethereum/contract/contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'voter-coin-dapp';

  constructor(
    private walletService : WalletService,
    private contractService: ContractService) {
  }
  ngOnInit(): void {
    this.walletService.connectWallet();
  }
}

// const loadBlockchain = async() => {
  
//     const accounts = await window.ethereum.request({method : 'eth_requestAccounts'});
//     console.log(accounts[0])
// }
