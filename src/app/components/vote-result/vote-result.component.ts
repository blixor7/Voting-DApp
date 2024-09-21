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
  @Input() optionsList: any;
  @Input() votesPerOption: any;
  constructor(private cd: CommonDataService, private changeDetectorRef: ChangeDetectorRef){}
  ngOnChanges(changes: SimpleChanges): void {
    // this.buildChart();
    // combineLatest(
    //   [this.cd.getData(RESULT_OPTION_LIST), this.cd.getData(RESULT_VOTE_PER_OPTION)])
    // .subscribe(([optionsList, votesPerOption]) => {
    //   console.log("combined obs for pie chart",optionsList,votesPerOption);
    //   this.buildChart(optionsList, votesPerOption);
    //   console.log();
    // });
    // this.buildChart(optionsList, votesPerOption);
    console.log("OUTSIDE ngOnChanges for ",this.optionsList, this.votesPerOption);
    if (changes['optionsList']
      // && !changes['optionsList'].firstChange
      && changes['votesPerOption'] 
      // && !changes['votesPerOption'].firstChange
    ) {
      // Property has changed (not initial binding)
      console.log("ngOnChanges for ",this.optionsList, this.votesPerOption);
      this.buildChart(this.optionsList, this.votesPerOption);
      this.changeDetectorRef.detectChanges();
    }
  }

  buildChart(labels:any,dataset:any){
    const ctx:any = document.getElementById('voteResults');

    if(this.optionsList && this.votesPerOption){
      //data.labels -> this.dataForResult.optionsList
      //data.datasets.data -> this.dataForResult.votesPerOption
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          // labels: ["Red", "Blue", "Green"],
          datasets: [{
            label: '# of Votes',
            data: dataset,
            // data: [3,6,1],
            borderWidth: 1
          }]
        },
      }); 
    }

    this.changeDetectorRef.detectChanges();
  }
}
