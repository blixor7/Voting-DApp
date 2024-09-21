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
    private cd: CommonDataService
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedVotingEvent'] && !changes['selectedVotingEvent'].firstChange) {
      if(this.selectedVotingEvent && !this.selectedVotingEvent[2]){
        for (var option of this.selectedVotingEvent[1]) {
          this.voteData.optionsList.push(option[0]);
          this.voteData.votesPerOption.push(Number(option[1]));
        }
        this.cd.setData(RESULT_OPTION_LIST,this.voteData.optionsList);
        this.cd.setData(RESULT_VOTE_PER_OPTION, this.voteData.votesPerOption);
      }
    }
  }

  stopVoting(){
    this.contractService.stopVoting(<any>this.selectedEventId);
    if(this.selectedVotingEvent && !this.selectedVotingEvent[2]){
      for (var option of this.selectedVotingEvent[1]) {
        this.voteData.optionsList.push(option[0]);
        this.voteData.votesPerOption.push(Number(option[1]));
      }
      this.cd.setData(RESULT_OPTION_LIST,this.voteData.optionsList);
      this.cd.setData(RESULT_VOTE_PER_OPTION, this.voteData.votesPerOption);
    }
  }

  async getAllEvents(){
    await this.contractService.fetchAndSaveAllData();
    this.cd.getData(VOTING_EVENTS_LIST).subscribe(list => console.log(list));
  }
}
