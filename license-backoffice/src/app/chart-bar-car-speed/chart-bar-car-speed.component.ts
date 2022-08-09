import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-bar-car-speed',
  templateUrl: './chart-bar-car-speed.component.html',
  styleUrls: ['./chart-bar-car-speed.component.css']
})
export class ChartBarCarSpeedComponent implements OnInit {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['<40', '50', '60', '70', '80', '90', '100', '110', '120+'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'จำนวนรถ' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
