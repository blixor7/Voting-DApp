import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { ContractService } from '../../ethereum/contract/contract.service';
import { CommonDataService } from '../../common-data/common-data.service';
import { CONTRACT, CONTRACT_ADDRESS, CONTRACT_OWNER, SIGNER_ADDRESS } from '../../common-data/common-data.keys';
import { combineLatest, map } from 'rxjs';
import { CommonDataUtilService } from '../../common-data/common-data.util.service';

@Component({
  selector: 'app-active-account-card',
  templateUrl: './active-account-card.component.html',
  styleUrl: './active-account-card.component.css'
})
export class ActiveAccountCardComponent implements OnInit{

  loggedInAccount: string | undefined;
  isThisOwner: boolean | undefined;

  constructor(
    private cd: CommonDataService, 
    private cdUtil: CommonDataUtilService){
  }

  ngOnInit(): void {
    this.cd.getData(SIGNER_ADDRESS).subscribe(value => {
      if(value) // to avoid initial null value from common data service
        this.loggedInAccount = this.cdUtil.simplifyAcctAddress(value);
    });
  }
}
