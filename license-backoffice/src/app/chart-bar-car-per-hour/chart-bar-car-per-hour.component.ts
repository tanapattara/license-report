import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterlicenseService } from '../services/filterlicense.service';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import * as ApexCharts from 'apexcharts';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Filter } from '../model/Filter';

export type HeatMapChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-chart-bar-car-per-hour',
  templateUrl: './chart-bar-car-per-hour.component.html',
  styleUrls: ['./chart-bar-car-per-hour.component.css'],
})
export class ChartBarCarPerHourComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถต่อวัน';

  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  datepickerInput1 = '';
  datepickerInput2 = '';
  speedInput = '';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
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
  defaultValue = 'All';

  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<string, number>();
  chartDictionaryBike = new Map<string, number>();

  speedInputA = '';
  speedInputB = '';
  bike = 0;
  car = 0;
  o50bike = 0;
  o50car = 0;
  o50 = 0;
  o50bike_per = 0;
  o50car_per = 0;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'ชั่วโมง',
          color: 'rgb(204, 61, 0)',
        },
      },
      y: {
        stacked: true,
        min: 0,
        title: {
          display: true,
          text: 'จำนวน',
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
        anchor: 'center',
        align: 'center',
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
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'รถยนต์',
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
        label: 'รถจักรยานยนต์',
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

  // heatmap
  public chartOptions!: Partial<HeatMapChartOptions>;
  chartDictionary = new Map<number, number[]>();

  filter: string = '';
  notifierSubscription: Subscription = this.filterService.event.subscribe(
    (notified) => {
      this.filter = this.filterService.getFilter();
      this.dataSource.filter = this.filter;
      this.displayData();
    }
  );

  constructor(
    private api: ApiService,
    private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'printer',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg')
    );

    this.clearDic();
    this.chartOptions = {
      series: [
        {
          name: '1',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '2',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '3',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '4',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '5',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '6',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '7',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '8',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '9',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '10',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },

        {
          name: '11',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '12',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '13',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '14',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '15',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '16',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '17',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '18',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '19',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '20',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },

        {
          name: '21',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '22',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '23',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '24',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '25',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '26',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '27',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '28',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '29',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
        {
          name: '30',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },

        {
          name: '31',
          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ],
        },
      ],
      chart: {
        redrawOnWindowResize: true,
        redrawOnParentResize: true,
        width: '100%',
        height: 500,
        type: 'heatmap',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#CC3D00'],
      yaxis: {
        title: {
          text: 'วันที่',
        },
      },
    };
  }

  ngOnInit(): void { }
  displayData() {
    this.clearDic();
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    if (this.dataSource.filteredData.length) {
      for (let row of this.dataSource.filteredData) {
        let d: Date = new Date(row.aDate);
        let isBike: boolean = row.Type == '7' || row.Type == '8';
        this.setHourinDate(d.getDate(), d.getHours());

        let hour = '';
        let value = 0;
        switch (d.getHours()) {
          case 0: {
            hour = '00';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 1: {
            hour = '01';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 2: {
            hour = '02';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 3: {
            hour = '03';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 4: {
            hour = '04';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 5: {
            hour = '05';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 6: {
            hour = '06';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 7: {
            hour = '07';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 8: {
            hour = '08';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 9: {
            hour = '09';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 10: {
            hour = '10';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 11: {
            hour = '11';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }

          case 12: {
            hour = '12';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 13: {
            hour = '13';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 14: {
            hour = '14';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 15: {
            hour = '15';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 16: {
            hour = '16';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 17: {
            hour = '17';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 18: {
            hour = '18';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 19: {
            hour = '19';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 20: {
            hour = '20';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 21: {
            hour = '21';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 22: {
            hour = '22';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
          case 23: {
            hour = '23';
            value = isBike
              ? this.chartDictionaryBike.get(hour)! + 1
              : this.chartDictionaryCar.get(hour)! + 1;
            break;
          }
        }

        if (hour == '') continue;

        if (isBike) {
          this.chartDictionaryBike.set(hour, value);
          this.bike++;
          if (row.Speed > 50)
            this.o50bike++;
        } else {
          this.chartDictionaryCar.set(hour, value);
          this.car++;
          if (row.Speed > 50)
            this.o50car++;
        }

        this.chartOptions.series = [
          { name: '1', data: this.generateData(1) },
          { name: '2', data: this.generateData(2) },
          { name: '3', data: this.generateData(3) },
          { name: '4', data: this.generateData(4) },
          { name: '5', data: this.generateData(5) },
          { name: '6', data: this.generateData(6) },
          { name: '7', data: this.generateData(7) },
          { name: '8', data: this.generateData(8) },
          { name: '9', data: this.generateData(9) },
          { name: '10', data: this.generateData(10) },

          { name: '11', data: this.generateData(11) },
          { name: '12', data: this.generateData(12) },
          { name: '13', data: this.generateData(13) },
          { name: '14', data: this.generateData(14) },
          { name: '15', data: this.generateData(15) },
          { name: '16', data: this.generateData(16) },
          { name: '17', data: this.generateData(17) },
          { name: '18', data: this.generateData(18) },
          { name: '19', data: this.generateData(19) },
          { name: '20', data: this.generateData(20) },

          { name: '21', data: this.generateData(21) },
          { name: '22', data: this.generateData(22) },
          { name: '23', data: this.generateData(23) },
          { name: '24', data: this.generateData(24) },
          { name: '25', data: this.generateData(25) },
          { name: '26', data: this.generateData(26) },
          { name: '27', data: this.generateData(27) },
          { name: '28', data: this.generateData(28) },
          { name: '29', data: this.generateData(29) },
          { name: '30', data: this.generateData(30) },

          { name: '31', data: this.generateData(31) },
        ];
      }
    }
    this.o50 = this.o50bike + this.o50car;
    this.o50bike_per = this.o50bike / this.o50 * 100;
    this.o50car_per = this.o50car / this.o50 * 100;
    for (let [key, value] of this.chartDictionaryCar) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }
    let n = this.dataSource.filteredData.length;

    for (let [key, value] of this.chartDictionaryBike) {
      let perValue = (value / n) * 100;
      this.barChartData.datasets[1].data.push(value);
    }
    // this.chart!.update();
    this.charts?.forEach((child) => {
      child.chart?.update();
    });
  }
  setHourinDate(iDate: number, hour: number) {
    let series = this.chartDictionary.get(iDate)!;
    series[hour] = series[hour] + 1;
    this.chartDictionary.set(iDate, series);
  }

  clearDic() {
    this.bike = 0;
    this.car = 0;
    this.o50bike = 0;
    this.o50car = 0;
    this.o50 = 0;
    this.o50bike_per = 0;
    this.o50car_per = 0;
    this.chartDictionaryCar.set('00', 0);
    this.chartDictionaryCar.set('01', 0);
    this.chartDictionaryCar.set('02', 0);
    this.chartDictionaryCar.set('03', 0);
    this.chartDictionaryCar.set('04', 0);
    this.chartDictionaryCar.set('05', 0);
    this.chartDictionaryCar.set('06', 0);
    this.chartDictionaryCar.set('07', 0);
    this.chartDictionaryCar.set('08', 0);
    this.chartDictionaryCar.set('09', 0);
    this.chartDictionaryCar.set('10', 0);
    this.chartDictionaryCar.set('11', 0);
    this.chartDictionaryCar.set('12', 0);
    this.chartDictionaryCar.set('13', 0);
    this.chartDictionaryCar.set('14', 0);
    this.chartDictionaryCar.set('15', 0);
    this.chartDictionaryCar.set('16', 0);
    this.chartDictionaryCar.set('17', 0);
    this.chartDictionaryCar.set('18', 0);
    this.chartDictionaryCar.set('19', 0);
    this.chartDictionaryCar.set('20', 0);
    this.chartDictionaryCar.set('21', 0);
    this.chartDictionaryCar.set('22', 0);
    this.chartDictionaryCar.set('23', 0);

    this.chartDictionaryBike.set('00', 0);
    this.chartDictionaryBike.set('01', 0);
    this.chartDictionaryBike.set('02', 0);
    this.chartDictionaryBike.set('03', 0);
    this.chartDictionaryBike.set('04', 0);
    this.chartDictionaryBike.set('05', 0);
    this.chartDictionaryBike.set('06', 0);
    this.chartDictionaryBike.set('07', 0);
    this.chartDictionaryBike.set('08', 0);
    this.chartDictionaryBike.set('09', 0);
    this.chartDictionaryBike.set('10', 0);
    this.chartDictionaryBike.set('11', 0);
    this.chartDictionaryBike.set('12', 0);
    this.chartDictionaryBike.set('13', 0);
    this.chartDictionaryBike.set('14', 0);
    this.chartDictionaryBike.set('15', 0);
    this.chartDictionaryBike.set('16', 0);
    this.chartDictionaryBike.set('17', 0);
    this.chartDictionaryBike.set('18', 0);
    this.chartDictionaryBike.set('19', 0);
    this.chartDictionaryBike.set('20', 0);
    this.chartDictionaryBike.set('21', 0);
    this.chartDictionaryBike.set('22', 0);
    this.chartDictionaryBike.set('23', 0);

    this.chartDictionary.set(
      1,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      2,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      3,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      4,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      5,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      6,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      7,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      8,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      9,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      10,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    this.chartDictionary.set(
      11,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      12,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      13,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      14,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      15,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      16,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      17,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      18,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      19,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      20,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    this.chartDictionary.set(
      21,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      22,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      23,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      24,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      25,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      26,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      27,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      28,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      29,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
    this.chartDictionary.set(
      30,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );

    this.chartDictionary.set(
      31,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    );
  }
  public generateData(iDate: number) {
    var i = 0;
    var series = [];
    var datas = this.chartDictionary.get(iDate);
    while (i < 31) {
      series.push({
        x: i < 10 ? '0' + i.toString() : i.toString(),
        y: datas![i],
      });
      i++;
    }
    return series;
  }
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }
  print() {
    window.print();
  }
  clearFilter() {
    this.datepickerInput1 = '';
    this.datepickerInput2 = '';
    this.speedInputA = '';
    this.speedInputB = '';
    let filter = {} as Filter;
    this.displayData();
  }
  search() {
    let filter = {} as Filter;
    filter.startDate = this.range.value.start as Date;
    filter.endDate = this.range.value.end as Date;
    filter.minSpeed = parseInt(this.speedInputA.valueOf());
    filter.maxSpeed = parseInt(this.speedInputB.valueOf());
    // console.log(filter);
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
}
