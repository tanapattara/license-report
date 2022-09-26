import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { License } from '../model/license';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Filter } from '../model/Filter';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-chart-bar-car-speed',
  templateUrl: './chart-bar-car-speed.component.html',
  styleUrls: ['./chart-bar-car-speed.component.css'],
})
export class ChartBarCarSpeedComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถต่อช่วงความเร็ว';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @ViewChild('startTimeSelection') startTimeSelection!: MatSelect;
  @ViewChild('endTimeSelection') endTimeSelection!: MatSelect;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  datepickerInput1 = '';
  datepickerInput2 = '';
  speedInput = '';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  defaultValue = 'All';

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

  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<number, number>();
  chartDictionaryBike = new Map<number, number>();

  bike = 0;
  car = 0;
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
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'ความเร็ว km/hr',
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
        display: (context) => {
          var datai = context.dataIndex;
          return context.dataset.data[datai] != 0;
        },
        anchor: 'center',
        align: 'center',
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
    labels: [
      '0',
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
      '90',
      '100',
      '110',
      '120',
      '130+',
    ],
    datasets: [
      {
        data: [],
        label: 'รถยนต์',
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
        borderSkipped: 'middle',
        datalabels: {
          align: 'center',
          anchor: 'center',
        },
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

  filter: string = '';

  constructor(
    private api: ApiService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'printer',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg')
    );
  }

  ngOnInit(): void {}
  clearDic() {
    this.car = 0;
    this.bike = 0;
    this.chartDictionaryCar.set(0, 0);
    this.chartDictionaryCar.set(10, 0);
    this.chartDictionaryCar.set(20, 0);
    this.chartDictionaryCar.set(30, 0);
    this.chartDictionaryCar.set(40, 0);
    this.chartDictionaryCar.set(50, 0);
    this.chartDictionaryCar.set(60, 0);
    this.chartDictionaryCar.set(70, 0);
    this.chartDictionaryCar.set(80, 0);
    this.chartDictionaryCar.set(90, 0);
    this.chartDictionaryCar.set(100, 0);
    this.chartDictionaryCar.set(110, 0);
    this.chartDictionaryCar.set(120, 0);
    this.chartDictionaryCar.set(130, 0);

    this.chartDictionaryBike.set(0, 0);
    this.chartDictionaryBike.set(10, 0);
    this.chartDictionaryBike.set(20, 0);
    this.chartDictionaryBike.set(30, 0);
    this.chartDictionaryBike.set(40, 0);
    this.chartDictionaryBike.set(50, 0);
    this.chartDictionaryBike.set(60, 0);
    this.chartDictionaryBike.set(70, 0);
    this.chartDictionaryBike.set(80, 0);
    this.chartDictionaryBike.set(90, 0);
    this.chartDictionaryBike.set(100, 0);
    this.chartDictionaryBike.set(110, 0);
    this.chartDictionaryBike.set(120, 0);
    this.chartDictionaryBike.set(130, 0);
  }
  displayData() {
    this.clearDic();
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];
    for (let row of this.dataSource.filteredData) {
      let speed: Number = parseInt(row.Speed);
      let isBike: boolean = row.Type == '7' || row.Type == '8';
      let k = 0;
      let value = 0;

      if (speed < 10) {
        value = isBike
          ? this.chartDictionaryBike.get(0)! + 1
          : this.chartDictionaryCar.get(0)! + 1;
        k = 0;
      } else if (speed < 20) {
        value = isBike
          ? this.chartDictionaryBike.get(10)! + 1
          : this.chartDictionaryCar.get(10)! + 1;
        k = 10;
      } else if (speed < 30) {
        value = isBike
          ? this.chartDictionaryBike.get(20)! + 1
          : this.chartDictionaryCar.get(20)! + 1;
        k = 20;
      } else if (speed < 40) {
        value = isBike
          ? this.chartDictionaryBike.get(30)! + 1
          : this.chartDictionaryCar.get(30)! + 1;
        k = 30;
      } else if (speed < 50) {
        value = isBike
          ? this.chartDictionaryBike.get(40)! + 1
          : this.chartDictionaryCar.get(40)! + 1;
        k = 40;
      } else if (speed < 60) {
        value = isBike
          ? this.chartDictionaryBike.get(50)! + 1
          : this.chartDictionaryCar.get(50)! + 1;
        k = 50;
      } else if (speed < 70) {
        value = isBike
          ? this.chartDictionaryBike.get(60)! + 1
          : this.chartDictionaryCar.get(60)! + 1;
        k = 60;
      } else if (speed < 80) {
        value = isBike
          ? this.chartDictionaryBike.get(70)! + 1
          : this.chartDictionaryCar.get(70)! + 1;
        k = 70;
      } else if (speed < 90) {
        value = isBike
          ? this.chartDictionaryBike.get(80)! + 1
          : this.chartDictionaryCar.get(80)! + 1;
        k = 80;
      } else if (speed < 100) {
        value = isBike
          ? this.chartDictionaryBike.get(90)! + 1
          : this.chartDictionaryCar.get(90)! + 1;
        k = 90;
      } else if (speed < 110) {
        value = isBike
          ? this.chartDictionaryBike.get(100)! + 1
          : this.chartDictionaryCar.get(100)! + 1;
        k = 100;
      } else if (speed < 120) {
        value = isBike
          ? this.chartDictionaryBike.get(110)! + 1
          : this.chartDictionaryCar.get(110)! + 1;
        k = 110;
      } else if (speed < 130) {
        value = isBike
          ? this.chartDictionaryBike.get(120)! + 1
          : this.chartDictionaryCar.get(120)! + 1;
        k = 120;
      } else if (speed >= 130) {
        value = isBike
          ? this.chartDictionaryBike.get(130)! + 1
          : this.chartDictionaryCar.get(130)! + 1;
        k = 130;
      }

      if (isBike) {
        this.chartDictionaryBike.set(k, value);
        this.bike++;
      } else {
        this.chartDictionaryCar.set(k, value);
        this.car++;
      }
    }
    for (let [key, value] of this.chartDictionaryCar) {
      let ktext = key.toString();
      if (key == 130) ktext = '130+';
      this.barChartData.labels!.push(ktext);
      this.barChartData.datasets[0].data.push(value);
    }
    let n = this.dataSource.filteredData.length;
    for (let [key, value] of this.chartDictionaryBike) {
      let perValue = (value / n) * 100;
      this.barChartData.datasets[1].data.push(value);
    }

    this.chart?.update();
  }
  clearFilter() {
    this.datepickerInput1 = '';
    this.datepickerInput2 = '';

    this.startTimeSelection.options.first.select();
    this.endTimeSelection.options.first.select();
    this.dataSource = new MatTableDataSource();
    this.displayData();
  }

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
  search() {
    let filter = {} as Filter;
    filter.startDate = this.range.value.start as Date;
    filter.endDate = this.range.value.end as Date;
    filter.color = 'All';
    filter.province = 'All';
    filter.place = 'All';
    filter.startHour = this.startTimeSelection.value;
    filter.endHour = this.endTimeSelection.value;
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
