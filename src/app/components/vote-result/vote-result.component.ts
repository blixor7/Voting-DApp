import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonDataService } from '../../common-data/common-data.service';
import { combineLatest } from 'rxjs';
import { RESULT_OPTION_LIST, RESULT_VOTE_PER_OPTION } from '../../common-data/common-data.keys';

@Component({
  selector: 'app-vote-result',
  templateUrl: './vote-result.component.html',
  styleUrl: './vote-result.component.css'
})
export class VoteResultComponent implements OnChanges{
  @Input() optionsList: any = [];
  @Input() votesPerOption: any = [];
  chart: any = null;
  constructor(private cd: CommonDataService){}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['optionsList'] && changes['votesPerOption'] ) {
      this.buildChart(this.optionsList, this.votesPerOption);
    }
  }

  buildChart(labels:any,dataset:any){
    const ctx:any = document.getElementById('voteResults');

    if(this.chart!=null){
      // Chart.js requires that a canvas element be exclusively 
      // associated with a single chart instance. 
      // If you attempt to create a new chart on a canvas 
      // that's already in use, it will give error !
      this.chart.destroy();
    }

    if(this.optionsList && this.votesPerOption){
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: '# of Votes',
            data: dataset,
            borderWidth: 1
          }]
        },
      }); 
    }
  }
}
