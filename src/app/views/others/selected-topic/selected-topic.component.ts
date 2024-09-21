import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonDataService } from '../../../common-data/common-data.service';
import { RESULT_OPTION_LIST, RESULT_VOTE_PER_OPTION, SELECTED_TOPIC } from '../../../common-data/common-data.keys';

@Component({
  selector: 'app-selected-topic',
  templateUrl: './selected-topic.component.html',
  styleUrl: './selected-topic.component.css'
})
export class SelectedTopicComponent implements OnInit, OnChanges {
  @Input() selectedVotingEvent: any;
  @Input() selectedEventId: number = -1;
  voteData: any = {
    optionsList: [],
    votesPerOption: []
  };

  constructor(private cd: CommonDataService){}

  ngOnInit(){
    if(this.selectedVotingEvent && !this.selectedVotingEvent[2]){
      for (var option of this.selectedVotingEvent[1]) {
        this.voteData.optionsList.push(option[0]);
        this.voteData.votesPerOption.push(Number(option[1]));
      }
      this.cd.setData(RESULT_OPTION_LIST,this.voteData.optionsList);
      this.cd.setData(RESULT_VOTE_PER_OPTION, this.voteData.votesPerOption);
    }
  }

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

  vote(){}
}
