import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selected-topic',
  templateUrl: './selected-topic.component.html',
  styleUrl: './selected-topic.component.css'
})
export class SelectedTopicComponent {
  @Input() selectedVotingEvent: any;
}
