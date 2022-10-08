import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //@ViewChild(BaseChartDirective) chartHour: BaseChartDirective | undefined;
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;

  car = 0;
  moto = 0;
  speedavg = 0;
  over50 = 0
  over50bike = 0;
  over50car = 0;
  over50percent = 0;
  over50percent_car = 0;
  over50percent_bike = 0;
  // Bar chart by Hour
  hourCar = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  hourBike = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  monthCar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  monthMoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  weekdayCar = [0, 0, 0, 0, 0, 0, 0];
  weekdayBike = [0, 0, 0, 0, 0, 0, 0];
  public dynHeight = 300;
  // Car Chart
  public barChartCarOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };
  public barChartCarData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [],
        rotation: 90,
        backgroundColor: ['rgb(235, 90, 71)', 'rgb(238, 238, 238)'],
        borderRadius: Number.MAX_VALUE,
      },
    ],
  };
  // Moto Chart
  public barChartMotoOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };
  public barChartMotoData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: [],
        rotation: 90,
        backgroundColor: ['rgb(235, 90, 71)', 'rgb(238, 238, 238)'],

        borderRadius: Number.MAX_VALUE,
      },
    ],
  };
  // Bar chart by Hour
  public barChartHourOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };
  public barChartHourData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'รถยนต์',
        data: [],
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
        hoverBackgroundColor: 'rgb(233, 237, 247)',
        borderSkipped: 'middle',
      },
      {
        label: 'รถจักรยานยนต์',
        data: [],
        borderColor: 'rgb(255, 172, 131)',
        backgroundColor: 'rgb(255, 172, 131)',
        borderRadius: Number.MAX_VALUE,
        hoverBackgroundColor: 'rgb(233, 237, 247)',
      },
    ],
  };
  // Month
  public barChartMonthOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        align: 'start',
      },
      datalabels: {
        display: false,
      },
    },
  };
  public barChartMonthData: ChartData<'bar'> = {
    labels: [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ],
    datasets: [
      {
        label: 'รถยนต์',
        data: [],
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
        hoverBackgroundColor: 'rgb(233, 237, 247)',
        borderSkipped: 'middle',
      },
      {
        label: 'รถจักรยานยนต์',
        data: [],
        borderColor: 'rgb(255, 172, 131)',
        backgroundColor: 'rgb(255, 172, 131)',
        borderRadius: Number.MAX_VALUE,
        hoverBackgroundColor: 'rgb(233, 237, 247)',
      },
    ],
  };
  // Day
  public barChartDayOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };
  public barChartDayData: ChartData<'bar'> = {
    labels: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    datasets: [
      {
        label: 'รถยนต์',
        data: [],
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
        hoverBackgroundColor: 'rgb(233, 237, 247)',
        borderSkipped: 'middle',
      },
      {
        label: 'รถจักรยานยนต์',
        data: [],
        borderColor: 'rgb(255, 172, 131)',
        backgroundColor: 'rgb(255, 172, 131)',
        borderRadius: Number.MAX_VALUE,
        hoverBackgroundColor: 'rgb(233, 237, 247)',
      },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';
  public barChartType: ChartType = 'bar';

  constructor(private apiService: DashboardService) { }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.getAllLicense();
  }
  getAllLicense() {
    this.apiService.getLicenses().subscribe({
      next: (res) => {
        console.log(res);
        this.setVehicle(res);
      },
      error: (err) => {
        console.log('Error while fetching licenses ');
      },
    });
  }
  setVehicle = (data: any) => {

    for (let license of data!) {
      let adate = new Date(license['aDate']);
      let h = adate.getHours();
      let w = adate.getDay();
      let m = adate.getMonth();
      let speed = parseInt(license['Speed']);
      this.speedavg += speed;
      if (speed > 50) {
        this.over50++;
        if (license['Type'] == '7' || license['Type'] == '8') {
          this.over50bike++;
        } else {
          this.over50car++;
        }
      }

      if (license['Type'] == '7' || license['Type'] == '8') {
        this.moto++;
        this.monthMoto[--m]++;
        this.hourBike[h]++;
        this.weekdayBike[w]++;
      } else {
        this.car++;
        this.monthCar[--m]++;
        this.hourCar[h]++;
        this.weekdayCar[w]++;
      }
    }
    this.barChartCarData.datasets[0].data.push(this.car);
    this.barChartCarData.datasets[0].data.push(this.moto);
    this.barChartMotoData.datasets[0].data.push(this.moto);
    this.barChartMotoData.datasets[0].data.push(this.car);

    let index = 0;
    for (let i = 0; i < 24; i++) {
      if (i < 7) {
        // Sunday = 0
        this.barChartDayData.datasets[0].data.push(this.weekdayCar[i]);
        this.barChartDayData.datasets[1].data.push(this.weekdayBike[i]);
      }
      if (i < 12) {
        // January = 0
        this.barChartMonthData.datasets[0].data.push(this.monthCar[i]);
        this.barChartMonthData.datasets[1].data.push(this.monthMoto[i]);
      }

      if (i < 24) {
        this.barChartHourData.labels?.push(index++);
        this.barChartHourData.datasets[0].data.push(this.hourCar[i]);
        this.barChartHourData.datasets[1].data.push(this.hourBike[i]);
      }
    }
    this.speedavg = this.speedavg / (this.car + this.moto);
    this.over50percent = (this.over50 / (this.car + this.moto)) * 100;
    this.over50percent_bike = this.over50bike / this.over50 * 100;
    this.over50percent_car = this.over50car / this.over50 * 100;

    this.charts?.forEach((child) => {
      child.chart?.update();
    });
  };
}
