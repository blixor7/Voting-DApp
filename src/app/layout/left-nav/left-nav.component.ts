import { Component, OnInit } from '@angular/core';
import { CommonDataUtilService } from '../../common-data/common-data.util.service';
import { CommonDataService } from '../../common-data/common-data.service';
import { ContractService } from '../../ethereum/contract/contract.service';
import { VOTING_EVENTS_LIST } from '../../common-data/common-data.keys';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent implements OnInit{
  topicsList = [
    {name:"Topic 1"}, {name:"Topic 2"}
  ];

  topicsList2 = [];

  constructor(
    public contractService: ContractService,
    public cd: CommonDataService,
    public cdUtil: CommonDataUtilService){}

  ngOnInit(): void {

    this.cd.getData(VOTING_EVENTS_LIST).subscribe(value => {
      console.log("via common data ",value);
      
      this.topicsList2 = <any>value;

      // summaries[i].topic = votingEvent.topic;
      // summaries[i].options = votingEvent.options;
      // summaries[i].votingActive = votingEvent.votingActive;
      // summaries[i].exists = votingEvent.exists;

      console.log((<any>this.topicsList2[0]).length)
      console.log(this.topicsList2[0][0]) //topic
      console.log((<any>this.topicsList2[0][1]).length)
      console.log(this.topicsList2[0][1][0][0]) //options[0]
      console.log(this.topicsList2[0][1][1][0]) //options[1]
      console.log(this.topicsList2[0][2]) //votingActive
      console.log(this.topicsList2[0][3]) //exists
    });
  }
}
