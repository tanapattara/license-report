import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Filter } from '../model/Filter';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chart-bar-car-per-day',
  templateUrl: './chart-bar-car-per-day.component.html',
  styleUrls: ['./chart-bar-car-per-day.component.css'],
})
export class ChartBarCarPerDayComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('monthSelection') monthSelection!: MatSelect;

  @ViewChild('startTimeSelection') startTimeSelection!: MatSelect;
  @ViewChild('endTimeSelection') endTimeSelection!: MatSelect;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<number, number>();
  chartDictionaryBike = new Map<number, number>();
  defaultValue = 'All';
  month = [
    'All',
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];
  speedInput = '';
  data: License[] = [];
  time: string[] = [
    'All',
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];

  bike = 0;
  car = 0;
  o50bike = 0;
  o50car = 0;
  o50 = 0;
  o50bike_per = 0;
  o50car_per = 0;
  public barChartOptions: ChartConfiguration['options'];
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'>;
  speedInputA = '';
  speedInputB = '';
  constructor(
    private api: ApiService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private tran: TranslateService
  ) {
    iconRegistry.addSvgIcon(
      'printer',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg')
    );

    this.barChartData = {
      labels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
      ],
      datasets: [
        {
          data: [],
          label: this.tran.instant('car'),
          borderColor: 'rgb(204, 61, 0)',
          backgroundColor: 'rgb(204, 61, 0)',
          borderRadius: Number.MAX_VALUE,
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
          borderSkipped: 'middle',
        },
        {
          data: [],
          label: this.tran.instant('bike'),
          borderColor: 'rgb(255, 172, 131)',
          backgroundColor: 'rgb(255, 172, 131)',
          borderRadius: Number.MAX_VALUE,
          datalabels: {
            align: 'center',
            anchor: 'center',
          },
        },
      ],
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          display: true,
          title: {
            display: true,
            text: this.tran.instant('chart.day'),
            color: 'rgb(204, 61, 0)',
          },
        },
        y: {
          stacked: true,
          min: 0,
          display: true,
          title: {
            display: true,
            text: this.tran.instant('chart.count'),
            color: 'rgb(204, 61, 0)',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          align: 'start',
        },
        datalabels: {
          display: (context) => {
            return context.dataset.data[context.dataIndex] != 0;
          },
          color: (context) => {
            var strColor = context.datasetIndex == 0 ? 'white' : 'black';
            return strColor;
          },
          formatter: (value, ctx) => {
            return value.toLocaleString();
          },
        },
      },
    };
  }

  ngOnInit(): void {}

  displayData() {
    this.clearDic();
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    if (this.dataSource.filteredData.length) {
      for (let row of this.dataSource.filteredData) {
        let d: Date = new Date(row.aDate);
        let isBike: boolean = row.Type == '7' || row.Type == '8';

        let date = d.getDate();
        let value = isBike
          ? this.chartDictionaryBike.get(date)! + 1
          : this.chartDictionaryCar.get(date)! + 1;

        if (isBike) {
          this.chartDictionaryBike.set(date, value);
          this.bike++;
          if (row.Speed > 50) this.o50bike++;
        } else {
          this.chartDictionaryCar.set(date, value);
          this.car++;
          if (row.Speed > 50) this.o50car++;
        }
      }
    }
    this.o50 = this.o50bike + this.o50car;
    this.o50bike_per = (this.o50bike / this.o50) * 100;
    this.o50car_per = (this.o50car / this.o50) * 100;
    for (let [key, value] of this.chartDictionaryCar) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }
    let n = this.dataSource.filteredData.length;
    for (let [key, value] of this.chartDictionaryBike) {
      let perValue = (value / n) * 100;
      this.barChartData.datasets[1].data.push(value);
    }

    this.chart?.update();
  }
  clearDic() {
    this.bike = 0;
    this.car = 0;
    this.o50bike = 0;
    this.o50car = 0;
    this.o50 = 0;
    this.o50bike_per = 0;
    this.o50car_per = 0;
    this.chartDictionaryCar.set(1, 0);
    this.chartDictionaryCar.set(2, 0);
    this.chartDictionaryCar.set(3, 0);
    this.chartDictionaryCar.set(4, 0);
    this.chartDictionaryCar.set(5, 0);
    this.chartDictionaryCar.set(6, 0);
    this.chartDictionaryCar.set(7, 0);
    this.chartDictionaryCar.set(8, 0);
    this.chartDictionaryCar.set(9, 0);
    this.chartDictionaryCar.set(10, 0);
    this.chartDictionaryCar.set(11, 0);
    this.chartDictionaryCar.set(12, 0);
    this.chartDictionaryCar.set(13, 0);
    this.chartDictionaryCar.set(14, 0);
    this.chartDictionaryCar.set(15, 0);
    this.chartDictionaryCar.set(16, 0);
    this.chartDictionaryCar.set(17, 0);
    this.chartDictionaryCar.set(18, 0);
    this.chartDictionaryCar.set(19, 0);
    this.chartDictionaryCar.set(20, 0);
    this.chartDictionaryCar.set(21, 0);
    this.chartDictionaryCar.set(22, 0);
    this.chartDictionaryCar.set(23, 0);
    this.chartDictionaryCar.set(24, 0);
    this.chartDictionaryCar.set(25, 0);
    this.chartDictionaryCar.set(26, 0);
    this.chartDictionaryCar.set(27, 0);
    this.chartDictionaryCar.set(28, 0);
    this.chartDictionaryCar.set(29, 0);
    this.chartDictionaryCar.set(30, 0);
    this.chartDictionaryCar.set(31, 0);

    this.chartDictionaryBike.set(1, 0);
    this.chartDictionaryBike.set(2, 0);
    this.chartDictionaryBike.set(3, 0);
    this.chartDictionaryBike.set(4, 0);
    this.chartDictionaryBike.set(5, 0);
    this.chartDictionaryBike.set(6, 0);
    this.chartDictionaryBike.set(7, 0);
    this.chartDictionaryBike.set(8, 0);
    this.chartDictionaryBike.set(9, 0);
    this.chartDictionaryBike.set(10, 0);
    this.chartDictionaryBike.set(11, 0);
    this.chartDictionaryBike.set(12, 0);
    this.chartDictionaryBike.set(13, 0);
    this.chartDictionaryBike.set(14, 0);
    this.chartDictionaryBike.set(15, 0);
    this.chartDictionaryBike.set(16, 0);
    this.chartDictionaryBike.set(17, 0);
    this.chartDictionaryBike.set(18, 0);
    this.chartDictionaryBike.set(19, 0);
    this.chartDictionaryBike.set(20, 0);
    this.chartDictionaryBike.set(21, 0);
    this.chartDictionaryBike.set(22, 0);
    this.chartDictionaryBike.set(23, 0);
    this.chartDictionaryBike.set(24, 0);
    this.chartDictionaryBike.set(25, 0);
    this.chartDictionaryBike.set(26, 0);
    this.chartDictionaryBike.set(27, 0);
    this.chartDictionaryBike.set(28, 0);
    this.chartDictionaryBike.set(29, 0);
    this.chartDictionaryBike.set(30, 0);
    this.chartDictionaryBike.set(31, 0);
  }
  applyFilter(ob: MatSelectChange) {}
  clearFilter() {
    this.monthSelection.options.first.select();
    this.startTimeSelection.options.first.select();
    this.endTimeSelection.options.first.select();
    this.speedInputA = '';
    this.speedInputB = '';
    this.dataSource = new MatTableDataSource();
    this.displayData();
  }
  search() {
    let selectedMonth = this.monthSelection.value;

    let filter = {} as Filter;
    filter.minSpeed = parseInt(this.speedInputA.valueOf());
    filter.maxSpeed = parseInt(this.speedInputB.valueOf());
    filter.startHour = this.startTimeSelection.value;
    filter.endHour = this.endTimeSelection.value;
    if (selectedMonth != 'ALL') {
      filter.startDate = this.getStartDate(selectedMonth);
      filter.endDate = this.getEndDate(selectedMonth);
    }

    this.api.getLicensesWithFilter(filter).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.displayData();
      },
      error: (err) => {
        console.log('Error while fetching licenses with params');
      },
    });
  }
  // month = ['ALL', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  // 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  getStartDate(month: string): Date {
    let n = new Date();
    let strDate = n.getFullYear().toString();
    switch (month) {
      case 'มกราคม': {
        strDate += '-01-01';
        break;
      }
      case 'กุมภาพันธ์': {
        strDate += '-02-01';
        break;
      }
      case 'มีนาคม': {
        strDate += '-03-01';
        break;
      }
      case 'เมษายน': {
        strDate += '-04-01';
        break;
      }

      case 'พฤษภาคม': {
        strDate += '-05-01';
        break;
      }
      case 'มิถุนายน': {
        strDate += '-06-01';
        break;
      }
      case 'กรกฎาคม': {
        strDate += '-07-01';
        break;
      }
      case 'สิงหาคม': {
        strDate += '-08-01';
        break;
      }

      case 'กันยายน': {
        strDate += '-09-01';
        break;
      }
      case 'ตุลาคม': {
        strDate += '-10-01';
        break;
      }
      case 'พฤศจิกายน': {
        strDate += '-11-01';
        break;
      }
      case 'ธันวาคม': {
        strDate += '-12-01';
        break;
      }
    }
    return new Date(strDate);
  }
  getEndDate(month: string): Date {
    let n = new Date();
    let strDate = n.getFullYear().toString();
    switch (month) {
      case 'มกราคม': {
        strDate += '-01-31';
        break;
      }
      case 'กุมภาพันธ์': {
        strDate += '-02-29';
        break;
      }
      case 'มีนาคม': {
        strDate += '-03-31';
        break;
      }
      case 'เมษายน': {
        strDate += '-04-30';
        break;
      }

      case 'พฤษภาคม': {
        strDate += '-05-31';
        break;
      }
      case 'มิถุนายน': {
        strDate += '-06-30';
        break;
      }
      case 'กรกฎาคม': {
        strDate += '-07-31';
        break;
      }
      case 'สิงหาคม': {
        strDate += '-08-31';
        break;
      }

      case 'กันยายน': {
        strDate += '-09-30';
        break;
      }
      case 'ตุลาคม': {
        strDate += '-10-31';
        break;
      }
      case 'พฤศจิกายน': {
        strDate += '-11-30';
        break;
      }
      case 'ธันวาคม': {
        strDate += '-12-31';
        break;
      }
    }
    return new Date(strDate);
  }
  onChangeEvent(event: any, filtername: string) {}
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    //console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    //console.log(event, active);
  }
  print() {
    window.print();
  }
}
