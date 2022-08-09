import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart-bar-car-per-month',
  templateUrl: './chart-bar-car-per-month.component.html',
  styleUrls: ['./chart-bar-car-per-month.component.css']
})
export class ChartBarCarPerMonthComponent implements OnInit {
  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
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
