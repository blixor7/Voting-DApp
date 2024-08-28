import { Component } from '@angular/core';
import { CommonDataUtilService } from '../../common-data/common-data.util.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent {
  topicsList = [
    {name:"Topic 1"}, {name:"Topic 2"}
  ];

  constructor(public cdUtil: CommonDataUtilService){}
}
