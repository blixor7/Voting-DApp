import { Component, Input, OnInit } from '@angular/core';
import { ContractService } from '../../../ethereum/contract/contract.service';
import { CommonDataService } from '../../../common-data/common-data.service';
import { SELECTED_TOPIC, VOTING_EVENTS_LIST } from '../../../common-data/common-data.keys';

@Component({
  selector: 'app-existing-topic',
  templateUrl: './existing-topic.component.html',
  styleUrl: './existing-topic.component.css'
})
export class ExistingTopicComponent implements OnInit{
  @Input() selectedVotingEvent: any;
  @Input() selectedEventId: number = -1;

  constructor(
    private contractService: ContractService,
    private cd: CommonDataService
  ){}
  ngOnInit(): void {
    
    // this.cd.getData(SELECTED_TOPIC)
    //        .subscribe(eventId => {
    //         this.selectedEventId = eventId;
    //         console.log("event id", eventId);});
    
  }

  stopVoting(){
    this.contractService.stopVoting(<any>this.selectedEventId);
  }

  async getAllEvents(){
    await this.contractService.fetchAndSaveAllData();
    this.cd.getData(VOTING_EVENTS_LIST).subscribe(list => console.log(list));
  }
}
