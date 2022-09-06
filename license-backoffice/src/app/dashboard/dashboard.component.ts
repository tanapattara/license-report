import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  //@ViewChild(BaseChartDirective) chartHour: BaseChartDirective | undefined;
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  car = 0;
  moto = 0;
  // Bar chart by Hour
  hour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  monthCar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  monthMoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];;
  day = [0, 0, 0, 0, 0, 0, 0]
  public dynHeight = 300;
  // Car Chart
  public barChartCarOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false
      }
    }
  };
  public barChartCarData: ChartData<'doughnut'> = {
    datasets: [{
      data: [],
      rotation: 90,
      backgroundColor: [
        'rgb(235, 90, 71)',
        'rgb(238, 238, 238)',
      ],
      borderRadius: Number.MAX_VALUE,
    }]
  };
  // Moto Chart
  public barChartMotoOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      }
    }
  };
  public barChartMotoData: ChartData<'doughnut'> = {
    datasets: [{
      data: [],
      rotation: 90,
      backgroundColor: [
        'rgb(235, 90, 71)',
        'rgb(238, 238, 238)',
      ],

      borderRadius: Number.MAX_VALUE,
    }]
  };
  // Bar chart by Hour
  public barChartHourOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false
      }
    }

  };
  public barChartHourData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      data: [],
      borderColor: 'rgb(233, 237, 247)',
      backgroundColor: 'rgb(233, 237, 247)',
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
      hoverBackgroundColor: 'rgb(204, 61, 0)',
    }]
  };
  // Month
  public barChartMonthOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        align: 'start'
      },
      datalabels: {
        display: false
      }
    }
  };
  public barChartMonthData: ChartData<'bar'> = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    datasets: [{
      label: 'รถยนต์',
      data: [],
      borderColor: 'rgb(204, 61, 0)',
      backgroundColor: 'rgb(204, 61, 0)',
      borderRadius: Number.MAX_VALUE,
    }, {
      label: 'รถจักรยานยนต์',
      data: [],
      borderColor: 'rgb(255, 172, 131)',
      borderRadius: Number.MAX_VALUE,
      backgroundColor: 'rgb(255, 172, 131)'
    }]
  };
  // Day
  public barChartDayOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false
      }
    }
  };
  public barChartDayData: ChartData<'bar'> = {
    labels: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    datasets: [{
      data: [],
      borderColor: 'rgb(233, 237, 247)',
      backgroundColor: 'rgb(233, 237, 247)',
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
      hoverBackgroundColor: 'rgb(204, 61, 0)',
    },]
  };

  public doughnutChartType: ChartType = 'doughnut';
  public barChartType: ChartType = 'bar';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.getAllLicense();
  }
  getAllLicense() {
    this.apiService.getLicenses().
      subscribe({
        next: (res) => {
          console.log(res);
          this.setVehicle(res);
        },
        error: (err) => {
          console.log("Error while fetching licenses ");
        }
      });
  }
  setVehicle = (data: any) => {
    for (let license of data!) {
      let adate = new Date(license['aDate']);
      let h = adate.getHours();
      let w = adate.getDay();
      let m = adate.getMonth();

      this.hour[h]++;
      this.day[w]++;
      if (license['Type'] == '7' || license['Type'] == '8') {
        this.moto++;
        this.monthMoto[--m]++;
      }
      else {
        this.car++;
        this.monthCar[--m]++;
      }
    }
    this.barChartCarData.datasets[0].data.push(this.car);
    this.barChartCarData.datasets[0].data.push(this.moto);

    this.barChartMotoData.datasets[0].data.push(this.moto);
    this.barChartMotoData.datasets[0].data.push(this.car);

    let index = 0;
    for (let value of this.hour) {
      this.barChartHourData.labels?.push(index++);
      this.barChartHourData.datasets[0].data.push(value);
    }
    for (let i = 0; i < this.monthCar.length; i++) {
      this.barChartMonthData.datasets[0].data.push(this.monthCar[i]);
      this.barChartMonthData.datasets[1].data.push(this.monthMoto[i]);
    }
    for (let value of this.day) {
      this.barChartDayData.datasets[0].data.push(value);
    }
    this.charts?.forEach((child) => {
      child.chart?.update()
    });
  }
}
