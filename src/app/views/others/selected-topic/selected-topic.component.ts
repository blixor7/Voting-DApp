import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonDataService } from '../../../common-data/common-data.service';
import { RESULT_OPTION_LIST, RESULT_VOTE_PER_OPTION, SELECTED_TOPIC } from '../../../common-data/common-data.keys';

@Component({
  selector: 'app-selected-topic',
  templateUrl: './selected-topic.component.html',
  styleUrl: './selected-topic.component.css'
})
export class SelectedTopicComponent implements OnChanges {
  @Input() selectedVotingEvent: any;
  @Input() selectedEventId: number = -1;
  voteData: any = {
    optionsList: [],
    votesPerOption: []
  };

  constructor(private cd: CommonDataService, private ref: ChangeDetectorRef){}

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

  vote(){}
}
