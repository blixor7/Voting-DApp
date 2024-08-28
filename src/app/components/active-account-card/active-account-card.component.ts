import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { ContractService } from '../../ethereum/contract/contract.service';
import { CommonDataService } from '../../common-data/common-data.service';
import { CONTRACT, CONTRACT_ADDRESS } from '../../common-data/common-data.keys';

@Component({
  selector: 'app-active-account-card',
  templateUrl: './active-account-card.component.html',
  styleUrl: './active-account-card.component.css'
})
export class ActiveAccountCardComponent implements OnInit{

  loggedInAccount: string | undefined;

  constructor(private commonData: CommonDataService){

  }
  ngOnInit(): void {
    this.commonData.getData(CONTRACT_ADDRESS).subscribe(value => {
      this.loggedInAccount = value;
    })
  }

  
}
