import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ChartComponent,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { FilterlicenseService } from '../services/filterlicense.service';
import { MatTableDataSource } from '@angular/material/table';
import { License } from '../model/license';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
};

@Component({
  selector: 'app-chart-heatmap-hour',
  templateUrl: './chart-heatmap-hour.component.html',
  styleUrls: ['./chart-heatmap-hour.component.css']
})
export class ChartHeatmapHourComponent implements OnInit {

  @ViewChild("mychart") mychart!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>;
  dataSource!: MatTableDataSource<any>;
  filter: string = "";
  chartDictionary = new Map<number, number[]>();

  notifierSubscription: Subscription = this.filterService.event.subscribe(notified => {
    this.filter = this.filterService.getFilter();
    this.dataSource.filter = this.filter;
    this.displayData();
  });

  constructor(private api: ApiService, private filterService: FilterlicenseService) {
    this.clearDic();
    this.getAllLicense();
    this.chartOptions = {
      series: [
        { name: "1", data: this.generateData(1) },
        { name: "2", data: this.generateData(2) },
        { name: "3", data: this.generateData(3) },
        { name: "4", data: this.generateData(4) },
        { name: "5", data: this.generateData(5) },
        { name: "6", data: this.generateData(6) },
        { name: "7", data: this.generateData(7) },
        { name: "8", data: this.generateData(8) },
        { name: "9", data: this.generateData(9) },
        { name: "10", data: this.generateData(10) },

        { name: "11", data: this.generateData(11) },
        { name: "12", data: this.generateData(12) },
        { name: "13", data: this.generateData(13) },
        { name: "14", data: this.generateData(14) },
        { name: "15", data: this.generateData(15) },
        { name: "16", data: this.generateData(16) },
        { name: "17", data: this.generateData(17) },
        { name: "18", data: this.generateData(18) },
        { name: "19", data: this.generateData(19) },
        { name: "20", data: this.generateData(20) },

        { name: "21", data: this.generateData(21) },
        { name: "22", data: this.generateData(22) },
        { name: "23", data: this.generateData(23) },
        { name: "24", data: this.generateData(24) },
        { name: "25", data: this.generateData(25) },
        { name: "26", data: this.generateData(26) },
        { name: "27", data: this.generateData(27) },
        { name: "28", data: this.generateData(28) },
        { name: "29", data: this.generateData(29) },
        { name: "30", data: this.generateData(30) },

        { name: "31", data: this.generateData(31) },

      ],
      chart: {
        height: 560,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#CC3D00"],
    };
  }

  ngOnInit(): void {
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
                let strValue = value as string;
                if (value as string == 'All') {
                  isMatchFilter = true;
                } else if (strValue.includes('-')) {
                  let strSplited = strValue.split('-');
                  if (strValue.length > 1) {
                    let min = parseInt(strSplited[0]);
                    let max = parseInt(strSplited[1]);
                    if (min < max) {
                      isMatchFilter = (record[key as keyof License] >= min && record[key as keyof License] <= max);
                    } else {
                      isMatchFilter = (record[key as keyof License] <= min && record[key as keyof License] >= max);
                    }
                  } else {
                    let min = parseInt(strValue[0]);
                    isMatchFilter = (record[key as keyof License] <= min);

                  }
                } else {
                  let max: number = parseInt(value as string);
                  isMatchFilter = (record[key as keyof License] <= max);
                }
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

                isMatchFilter = (RecValueA >= sDate && RecValueA <= eDate) || (RecValueB >= sDate && RecValueB <= eDate);
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
  displayData() {
    this.clearDic();
    for (let row of this.dataSource.filteredData) {
      let d: Date = new Date(row.aDate);
      this.setHourinDate(d.getDate(), d.getHours());
    }
    this.chartOptions.series = [
      { name: "1", data: this.generateData(1) },
      { name: "2", data: this.generateData(2) },
      { name: "3", data: this.generateData(3) },
      { name: "4", data: this.generateData(4) },
      { name: "5", data: this.generateData(5) },
      { name: "6", data: this.generateData(6) },
      { name: "7", data: this.generateData(7) },
      { name: "8", data: this.generateData(8) },
      { name: "9", data: this.generateData(9) },
      { name: "10", data: this.generateData(10) },

      { name: "11", data: this.generateData(11) },
      { name: "12", data: this.generateData(12) },
      { name: "13", data: this.generateData(13) },
      { name: "14", data: this.generateData(14) },
      { name: "15", data: this.generateData(15) },
      { name: "16", data: this.generateData(16) },
      { name: "17", data: this.generateData(17) },
      { name: "18", data: this.generateData(18) },
      { name: "19", data: this.generateData(19) },
      { name: "20", data: this.generateData(20) },

      { name: "21", data: this.generateData(21) },
      { name: "22", data: this.generateData(22) },
      { name: "23", data: this.generateData(23) },
      { name: "24", data: this.generateData(24) },
      { name: "25", data: this.generateData(25) },
      { name: "26", data: this.generateData(26) },
      { name: "27", data: this.generateData(27) },
      { name: "28", data: this.generateData(28) },
      { name: "29", data: this.generateData(29) },
      { name: "30", data: this.generateData(30) },

      { name: "31", data: this.generateData(31) },
    ];
  }
  setHourinDate(iDate: number, hour: number) {
    let series = this.chartDictionary.get(iDate)!;
    series[hour] = series[hour] + 1;
    this.chartDictionary.set(iDate, series);
  }
  clearDic() {
    this.chartDictionary.set(1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(3, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(4, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(5, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(6, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(7, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(8, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(9, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(10, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    this.chartDictionary.set(11, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(12, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(13, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(14, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(15, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(16, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(17, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(18, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(19, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(20, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    this.chartDictionary.set(21, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(22, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(23, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(24, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(25, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(26, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(27, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(28, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(29, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set(30, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    this.chartDictionary.set(31, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  public generateData(iDate: number) {
    var i = 0;
    var series = [];
    var datas = this.chartDictionary.get(iDate);
    while (i < 31) {
      series.push({
        x: (i + 1).toString(),
        y: datas![i],
      });
      i++;
    }
    return series;
  }

}
