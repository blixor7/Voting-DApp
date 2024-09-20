import { Component, Input } from '@angular/core';
import { CommonDataService } from '../../../common-data/common-data.service';
import { SELECTED_TOPIC } from '../../../common-data/common-data.keys';

@Component({
  selector: 'app-selected-topic',
  templateUrl: './selected-topic.component.html',
  styleUrl: './selected-topic.component.css'
})
export class SelectedTopicComponent {
  @Input() selectedVotingEvent: any;
  @Input() selectedEventId: number = -1;

  constructor(private cd: CommonDataService){}

  ngOnInit(){
    // this.cd.getData(SELECTED_TOPIC)
    //        .subscribe(eventId => {
    //         this.selectedEventId = eventId;
    //         console.log("event id", eventId);});
  }

  vote(){}
}
