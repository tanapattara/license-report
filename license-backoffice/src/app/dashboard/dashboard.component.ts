import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  car = 0;
  moto = 0;
  // Bar chart by Hour
  hour = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  monthCar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  monthMoto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];;
  day = [0, 0, 0, 0, 0, 0, 0]
  public barChartHourOptions: ChartConfiguration['options'] = {
    responsive: true,
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
  public barChartHourType: ChartType = 'bar';
  public barChartHourPlugins = [DataLabelsPlugin];
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
  public barChartMonthType: ChartType = 'bar';
  public barChartMonthPlugins = [DataLabelsPlugin];
  public barChartMonthData: ChartData<'bar'> = {
    labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
    datasets: [{
      label: 'รถยนต์',
      data: [],
      borderColor: 'rgb(204, 61, 0)',
      backgroundColor: 'rgb(204, 61, 0)',
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
    }, {
      label: 'รถจักรยานยนต์',
      data: [],
      borderColor: 'rgb(255, 172, 131)',
      backgroundColor: 'rgb(255, 172, 131)'
    }]
  };
  // Day
  public barChartDayOptions: ChartConfiguration['options'] = {
    responsive: true,
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
  public barChartDayType: ChartType = 'bar';
  public barChartDayPlugins = [DataLabelsPlugin];
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
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
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
    this.chart?.update();
  }
}
