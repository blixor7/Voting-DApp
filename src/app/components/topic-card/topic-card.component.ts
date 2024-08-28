import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css'
})
export class TopicCardComponent {
  @Input() topicName: string | undefined;

  @Input() votingEvent: any;
}
