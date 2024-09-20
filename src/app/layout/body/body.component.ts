import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../common-data/common-data.service';
import { NEW_TOPIC_INPROGRESS, SELECTED_TOPIC, VOTING_EVENTS_LIST } from '../../common-data/common-data.keys';
import { combineLatest, concat, forkJoin, merge } from 'rxjs';
import { CommonDataUtilService } from '../../common-data/common-data.util.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit{

  votingEvent: any = null;
  votingId: any = null;

  isOwner: boolean = false;
  isNewTopic: boolean = false;

  constructor(private cd: CommonDataService, private cdUtil: CommonDataUtilService){}
  ngOnInit(): void {
    this.cdUtil.isOwnerLoggedIn().subscribe(value => this.isOwner = value);

    this.cd.getData(NEW_TOPIC_INPROGRESS).subscribe(status => this.isNewTopic = status);

    combineLatest([this.cd.getData(VOTING_EVENTS_LIST), this.cd.getData(SELECTED_TOPIC)])
      .subscribe(([votingEventsList, selectedId]) => {
        this.votingEvent = votingEventsList[selectedId];
        this.votingId = selectedId;
      });
  }

}
