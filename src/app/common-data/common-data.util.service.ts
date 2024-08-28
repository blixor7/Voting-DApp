import { combineLatest, map, Observable } from "rxjs";
import { CONTRACT_OWNER, SIGNER_ADDRESS } from "./common-data.keys";
import { Injectable } from "@angular/core";
import { CommonDataService } from "./common-data.service";

@Injectable({
  providedIn: 'root'
})
export class CommonDataUtilService {

  constructor(private commonData: CommonDataService) { }

  simplifyAcctAddress(address: string): string {
    return address.slice(0, 4)
      .concat("...")
      .concat(address.slice(address.length - 4, address.length - 1));
  }

  isOwnerLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.commonData.getData(SIGNER_ADDRESS),
      this.commonData.getData(CONTRACT_OWNER)
    ]).pipe(map(([signerAddress, owner]) => {
      console.log("Signer: ", signerAddress);
      console.log("Owner:  ", owner);
      return signerAddress === owner;
    }));
  }
}