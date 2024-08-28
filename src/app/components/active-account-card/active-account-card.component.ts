import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../ethereum/contract/contract.service';

@Component({
  selector: 'app-active-account-card',
  templateUrl: './active-account-card.component.html',
  styleUrl: './active-account-card.component.css'
})
export class ActiveAccountCardComponent implements OnInit{

  loggedInAccount: string | undefined;

  constructor(private contractService: ContractService){

  }
  ngOnInit(): void {
    // this.contractService.getLoggedInAccount().subscribe(val => {
    //   this.loggedInAccount = val;
    // });
    // setTimeout(()=>{
    //   this.loggedInAccount = this.contractService.getLoggedInAccount();
    // }, 3000);
    
  }

  
}
