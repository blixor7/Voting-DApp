import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../common-data/common-data.service';
import { CommonDataUtilService } from '../../common-data/common-data.util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isOwner: boolean;

  constructor(private cd: CommonDataService, private cdUtil: CommonDataUtilService){
      this.isOwner = false;
  }

  ngOnInit(): void {
    this.cdUtil.isOwnerLoggedIn().subscribe(isIt => this.isOwner=isIt);
  }
}
