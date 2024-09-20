import { Component, Input } from '@angular/core';
import { NEW_TOPIC_INPROGRESS } from '../../../common-data/common-data.keys';
import { CommonDataService } from '../../../common-data/common-data.service';
import { ContractService } from '../../../ethereum/contract/contract.service';


@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrl: './new-topic.component.css'
})
export class NewTopicComponent {
  @Input() selectedVotingEvent: any;

  topicName: string = "";
  optionsList: string[] = [""];

  constructor(public cd: CommonDataService, private cs: ContractService){}

  addAnotherOption(){
    this.optionsList.push("");
  }

  async submitNewTopic(){
    //validate the topic details entered
    console.log(this.topicName, this.optionsList);
    await this.cs.submitNewTopic(this.topicName, this.optionsList);
    this.cd.setData(NEW_TOPIC_INPROGRESS, false);
  }
}
