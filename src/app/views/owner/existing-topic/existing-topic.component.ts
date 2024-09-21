import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContractService } from '../../../ethereum/contract/contract.service';
import { CommonDataService } from '../../../common-data/common-data.service';
import { RESULT_OPTION_LIST, RESULT_VOTE_PER_OPTION, SELECTED_TOPIC, VOTING_EVENTS_LIST } from '../../../common-data/common-data.keys';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-existing-topic',
  templateUrl: './existing-topic.component.html',
  styleUrl: './existing-topic.component.css'
})
export class ExistingTopicComponent implements OnChanges {
  @Input() selectedVotingEvent: any;
  @Input() selectedEventId: number = -1;
  voteData: any = {
    optionsList: [],
    votesPerOption: []
  };

  constructor(
    private contractService: ContractService,
    private cd: CommonDataService,
    private ref: ChangeDetectorRef
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVotingEvent'] && !changes['selectedVotingEvent'].firstChange) {
      // Property has changed (not initial binding)
      console.log('selectedVotingEvent has changed:', changes['selectedVotingEvent'].currentValue, changes['selectedVotingEvent'].previousValue);
      if(this.selectedVotingEvent && !this.selectedVotingEvent[2]){
        for (var option of this.selectedVotingEvent[1]) {
          this.voteData.optionsList.push(option[0]);
          this.voteData.votesPerOption.push(Number(option[1]));
        }
        console.log("this.voteData 1", this.voteData);
        this.cd.setData(RESULT_OPTION_LIST,this.voteData.optionsList);
        this.cd.setData(RESULT_VOTE_PER_OPTION, this.voteData.votesPerOption);
      }
    }
    if (changes['selectedEventId'] && !changes['selectedEventId'].firstChange) {
      // Property has changed (not initial binding)
      console.log('selectedEventId has changed:', changes['selectedEventId'].currentValue, changes['selectedEventId'].previousValue);
    }
  }

  stopVoting(){
    this.contractService.stopVoting(<any>this.selectedEventId);
    //build data for piechart
    if(this.selectedVotingEvent && !this.selectedVotingEvent[2]){
      //build data for pie chart
      for (var option of this.selectedVotingEvent[1]) {
        this.voteData.optionsList.push(option[0]);
        this.voteData.votesPerOption.push(option[1]);
      }
      console.log("this.voteData 2", this.voteData);
      this.cd.setData(RESULT_OPTION_LIST,this.voteData.optionsList);
      this.cd.setData(RESULT_VOTE_PER_OPTION, this.voteData.votesPerOption);
      // this.selectedVotingEvent[1].for(
      //   (option:any) => {
      //     this.voteData.optionsList.push(option[0]);
      //     this.voteData.votesPerOption.push(option[1]);
      //   }
      // );
      console.log(this.voteData);
      this.ref.markForCheck();
    }
  }



  async getAllEvents(){
    await this.contractService.fetchAndSaveAllData();
    this.cd.getData(VOTING_EVENTS_LIST).subscribe(list => console.log(list));
  }
}
