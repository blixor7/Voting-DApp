import { Component, Input } from '@angular/core';
import { CommonDataService } from '../../common-data/common-data.service';
import { SELECTED_TOPIC } from '../../common-data/common-data.keys';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css'
})
export class TopicCardComponent {
  @Input() votingEvent: any;
  @Input() id: any;

  constructor(private cd: CommonDataService){}

  selectTopic(){
    this.cd.setData(SELECTED_TOPIC, this.id);
  }
}
