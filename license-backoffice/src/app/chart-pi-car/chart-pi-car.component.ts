import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart-pi-car',
  templateUrl: './chart-pi-car.component.html',
  styleUrls: ['./chart-pi-car.component.css']
})
export class ChartPiCarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = ['red', 'green', 'blue'];
  public pieChartDatasets = [{
    data: [300, 500, 100]
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
