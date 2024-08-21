import { Component, OnInit } from '@angular/core';
import { WalletService } from './ethereum/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'voter-coin-dapp';

  constructor(private walletService : WalletService) {
  }
  ngOnInit(): void {
    this.walletService.connect();
  }
}

// const loadBlockchain = async() => {
  
//     const accounts = await window.ethereum.request({method : 'eth_requestAccounts'});
//     console.log(accounts[0])
// }
