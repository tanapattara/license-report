import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-bar-car-per-hour',
  templateUrl: './chart-bar-car-per-hour.component.html',
  styleUrls: ['./chart-bar-car-per-hour.component.css']
})
export class ChartBarCarPerHourComponent implements OnInit {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
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
