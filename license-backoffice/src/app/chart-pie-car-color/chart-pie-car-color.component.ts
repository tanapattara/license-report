import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApiService } from '../services/api.service';
import { FilterlicenseService } from '../services/filterlicense.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { License } from '../model/license';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chart-pie-car-color',
  templateUrl: './chart-pie-car-color.component.html',
  styleUrls: ['./chart-pie-car-color.component.css']
})
export class ChartPieCarColorComponent implements OnInit {
  title = 'แผนภูมิสีรถ';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
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
          }
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          var txt = ctx.chart.data.labels![ctx.dataIndex] + " " + value.toLocaleString();
          return txt;
        },
        display: (context) => {
          console.log(context);
          var datas = context.dataset.data;
          var data = context.dataset.data[context.dataIndex] as number;
          var sum = 0;
          datas.forEach((obj) => {
            sum += obj as number;
          });
          const percent = data / sum * 100 || 0;
          return percent > 4;
        },
        font: {
          weight: 'bold',
          size: 18,
        }
      },
    },
    maintainAspectRatio: false,

  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }],

  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  filter: string = "";
  notifierSubscription: Subscription = this.filterService.event.subscribe(notified => {
    this.filter = this.filterService.getFilter();
    this.dataSource.filter = this.filter;
    this.displayData();
  });

  constructor(private api: ApiService, private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('printer', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg'));

  }

  chartDictionary = new Map<string, number>();

  pieChartDatasets: string[] = [];

  displayData() {
    this.chartDictionary.clear();
    this.pieChartData.datasets = []
    this.pieChartData.labels = [];

    for (let row of this.dataSource.filteredData) {

      let car_color = row.Color;
      switch (row.Color) {
        case 'ขาว': { car_color = 'White'; break; }
        case 'ดำ': { car_color = 'Black'; break; }
        case 'เทา': { car_color = 'Gray'; break; }
        case 'Grey': { car_color = 'Gray'; break; }
      }

      if (this.chartDictionary.has(car_color)) {
        let ex = this.chartDictionary.get(car_color)!;
        this.chartDictionary.set(car_color, ex + 1);
      }
      else {
        this.chartDictionary.set(car_color, 1);
      }
    }
    let datavalue: number[] = [];
    let datacolor: string[] = [];
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
    let colorcode = "";

    switch (colorname) {
      case 'Black': { colorcode = 'rgb(65, 71, 81)'; break; }
      case 'Gray': { colorcode = 'rgb(200, 208, 216)'; break; }
      case 'Red': { colorcode = 'rgb(231, 70, 83)'; break; }
      case 'White': { colorcode = 'rgb(244, 247, 248)'; break; }
      case 'Green': { colorcode = 'rgb(128, 189, 90)'; break; }
      case 'Blue': { colorcode = 'rgb(26, 138, 214)'; break; }
      case 'Yellow': { colorcode = 'rgb(255, 185, 84)'; break; }
      case 'Purple': { colorcode = 'rgb(146, 123, 214)'; break; }
      case 'Unknown': { colorcode = 'rgb(234, 182, 148)'; break; }
    }
    return colorcode;
  }
  ngOnInit(): void {
    this.getAllLicense();
  }
  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }
  getAllLicense() {
    this.api.getLicenses().
      subscribe({
        next: (res) => {
          //console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.filter = this.filter;
          this.dataSource.filterPredicate = function (record, filter) {
            var map = new Map(JSON.parse(filter));
            let isMatch = false;
            for (let [key, value] of map) {

              var isMatchFilter: boolean = false;

              if (key == 'Speed') {
                if (value as string == 'All')
                  isMatchFilter = true;
                let speedFilter: number = parseInt(value as string);
                isMatchFilter = (record[key as keyof License] <= speedFilter);
              } else if (key == 'LicNo') {
                if (value as string == 'All')
                  isMatchFilter = true;
                else
                  isMatchFilter = (record[key as keyof License].includes(value));
              } else if (key == 'date') {
                let date = value as string[];
                let sDate = new Date(date[0]);
                let eDate = new Date(date[1]);
                let adate_key = 'aDate', bdate_key = 'bDate'

                let RecValueA = new Date(record[adate_key as keyof License]);
                let RecValueB = new Date(record[bdate_key as keyof License]);

                if (sDate.getTime() == eDate.getTime()) {
                  isMatchFilter = (RecValueA.getFullYear() == sDate.getFullYear() && RecValueA.getMonth() == sDate.getMonth() && RecValueA.getDate() == sDate.getDate()) ||
                    (RecValueB.getFullYear() == sDate.getFullYear() && RecValueB.getMonth() == sDate.getMonth() && RecValueB.getDate() == sDate.getDate());
                }
                else {
                  isMatchFilter = (RecValueA.getFullYear() == sDate.getFullYear() && RecValueA.getMonth() == sDate.getMonth() && RecValueA.getDate() >= sDate.getDate()) &&
                    (RecValueB.getFullYear() == sDate.getFullYear() && RecValueB.getMonth() == sDate.getMonth() && RecValueB.getDate() >= sDate.getDate()) &&
                    (RecValueA.getFullYear() == eDate.getFullYear() && RecValueA.getMonth() == eDate.getMonth() && RecValueA.getDate() <= eDate.getDate()) &&
                    (RecValueB.getFullYear() == eDate.getFullYear() && RecValueB.getMonth() == eDate.getMonth() && RecValueB.getDate() <= eDate.getDate());
                }
              } else {
                isMatchFilter = (record[key as keyof License] == value);
              }
              isMatch = (value == "All") || isMatchFilter;
              if (!isMatch) return false;
            }
            return isMatch;
          }
          this.displayData();
        },
        error: (err) => {
          console.log("Error while fetching licenses ");
        }
      });
  }
  print() {
    window.print();
  }


}
