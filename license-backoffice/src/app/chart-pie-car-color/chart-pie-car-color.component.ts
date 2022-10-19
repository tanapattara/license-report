import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { License } from '../model/license';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-pie-car-color',
  templateUrl: './chart-pie-car-color.component.html',
  styleUrls: ['./chart-pie-car-color.component.css'],
})
export class ChartPieCarColorComponent implements OnInit {
  title = 'แผนภูมิสีรถ';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];

  bike = 0;
  car = 0;

  o50bike = 0;
  o50car = 0;
  o50 = 0;
  o50bike_per = 0;
  o50car_per = 0;
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 18,
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          var txt =
            ctx.chart.data.labels![ctx.dataIndex] +
            ' ' +
            value.toLocaleString();
          return txt;
        },
        display: (context) => {
          var datas = context.dataset.data;
          var data = context.dataset.data[context.dataIndex] as number;
          var sum = 0;
          datas.forEach((obj) => {
            sum += obj as number;
          });
          const percent = (data / sum) * 100 || 0;
          return percent > 4;
        },
        font: {
          weight: 'bold',
          size: 18,
        },
      },
    },
    maintainAspectRatio: false,
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

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
  }

  chartDictionary = new Map<string, number>();

  pieChartDatasets: string[] = [];

  displayData() {
    this.bike = 0;
    this.car = 0;
    this.o50bike = 0;
    this.o50car = 0;
    this.o50 = 0;
    this.o50bike_per = 0;
    this.o50car_per = 0;
    this.chartDictionary.clear();
    this.pieChartData.datasets = [];
    this.pieChartData.labels = [];

    for (let row of this.dataSource.filteredData) {
      let isBike: boolean = row.Type == '7' || row.Type == '8';
      if (isBike) {
        this.bike++;
        if (row.Speed > 50)
          this.o50bike++;
        
      } else {
        this.car++;
        if (row.Speed > 50)
          this.o50car++;
        
      }

      let car_color = row.Color;
      switch (row.Color) {
        case 'ขาว': {
          car_color = 'White';
          break;
        }
        case 'ดำ': {
          car_color = 'Black';
          break;
        }
        case 'เทา': {
          car_color = 'Gray';
          break;
        }
        case 'Grey': {
          car_color = 'Gray';
          break;
        }
      }

      if (this.chartDictionary.has(car_color)) {
        let ex = this.chartDictionary.get(car_color)!;
        this.chartDictionary.set(car_color, ex + 1);
      } else {
        this.chartDictionary.set(car_color, 1);
      }
    }
    let datavalue: number[] = [];
    let datacolor: string[] = [];
    this.o50 = this.o50bike + this.o50car;
    this.o50bike_per = this.o50bike / this.o50 * 100;
    this.o50car_per = this.o50car / this.o50 * 100;
    for (let [key, value] of this.chartDictionary) {
      this.pieChartData.labels!.push(key);
      //this.pieChartData.datasets[0].data.push(value);
      datavalue.push(value);
      datacolor.push(this.getColor(key));
    }
    this.pieChartData.datasets.push({
      data: datavalue,
      backgroundColor: datacolor,
    });

    this.chart?.update();
  }
  getColor(colorname: string): string {
    let colorcode = '';

    switch (colorname) {
      case 'Black': {
        colorcode = 'rgb(65, 71, 81)';
        break;
      }
      case 'Gray': {
        colorcode = 'rgb(200, 208, 216)';
        break;
      }
      case 'Red': {
        colorcode = 'rgb(231, 70, 83)';
        break;
      }
      case 'White': {
        colorcode = 'rgb(244, 247, 248)';
        break;
      }
      case 'Green': {
        colorcode = 'rgb(128, 189, 90)';
        break;
      }
      case 'Blue': {
        colorcode = 'rgb(26, 138, 214)';
        break;
      }
      case 'Yellow': {
        colorcode = 'rgb(255, 185, 84)';
        break;
      }
      case 'Purple': {
        colorcode = 'rgb(146, 123, 214)';
        break;
      }
      case 'Unknown': {
        colorcode = 'rgb(234, 182, 148)';
        break;
      }
    }
    return colorcode;
  }
  ngOnInit(): void {}
  searchedDataEvent(event: any) {
    this.dataSource = new MatTableDataSource(event);
    this.displayData();
  }
  ngOnDestroy() {}
  print() {
    window.print();
  }
  printDataEvent(event: any) {
    this.print();
  }
}
