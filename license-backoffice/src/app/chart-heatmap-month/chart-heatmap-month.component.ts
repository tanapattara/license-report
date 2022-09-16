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
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  colors: any;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-chart-heatmap-month',
  templateUrl: './chart-heatmap-month.component.html',
  styleUrls: ['./chart-heatmap-month.component.css']
})
export class ChartHeatmapMonthComponent implements OnInit {

  @ViewChild("mychart") mychart!: ChartComponent;

  public chartOptions!: Partial<ChartOptions>;
  dataSource!: MatTableDataSource<any>;
  filter: string = "";
  chartDictionary = new Map<string, number[]>();

  notifierSubscription: Subscription = this.filterService.event.subscribe(notified => {
    this.filter = this.filterService.getFilter();
    this.dataSource.filter = this.filter;
    this.displayData();
  });

  constructor(private api: ApiService, private filterService: FilterlicenseService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('printer', sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/Printer.svg'));

    this.chartOptions = {
      series: [
        { name: "มกราคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "กุมภาพันธ์", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "มีนาคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "เมษายน", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "พฤษภาคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "มิถุนายน", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "กรกฎาคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "สิงหาคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "กันยายน", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "ตุลาคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "พฤศจิกายน", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { name: "ธันวาคม", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
      ],
      chart: {
        redrawOnWindowResize: true,
        redrawOnParentResize: true,
        width: '100%',
        height: 500,
        type: "heatmap"
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#CC3D00"],
      yaxis: {
        title: {
          text: 'วันที่',
        },
      }
    };
    this.getAllLicense();
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {

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
  displayData() {
    this.clearDic();

    for (let row of this.dataSource.filteredData) {
      let d: Date = new Date(row.aDate);
      let isBike: boolean = row.Type == '7' || row.Type == '8';

      let month = "";
      let value = 0;
      switch (d.getMonth()) {
        case 0: { month = "มกราคม"; this.setDateinMonth(month, d.getDate()); break; }
        case 1: { month = "กุมภาพันธ์"; this.setDateinMonth(month, d.getDate()); break; }
        case 2: { month = "มีนาคม"; this.setDateinMonth(month, d.getDate()); break; }
        case 3: { month = "เมษายน"; this.setDateinMonth(month, d.getDate()); break; }
        case 4: { month = "พฤษภาคม"; this.setDateinMonth(month, d.getDate()); break; }
        case 5: { month = "มิถุนายน"; this.setDateinMonth(month, d.getDate()); break; }
        case 6: { month = "กรกฎาคม"; this.setDateinMonth(month, d.getDate()); break; }
        case 7: { month = "สิงหาคม"; this.setDateinMonth(month, d.getDate()); break; }
        case 8: { month = "กันยายน"; this.setDateinMonth(month, d.getDate()); break; }
        case 9: { month = "ตุลาคม"; this.setDateinMonth(month, d.getDate()); break; }
        case 10: { month = "พฤศจิกายน"; this.setDateinMonth(month, d.getDate()); break; }
        case 11: { month = "ธันวาคม"; this.setDateinMonth(month, d.getDate()); break; }
      }
    }

    this.chartOptions.series = [
      { name: "มกราคม", data: this.generateData("มกราคม") },
      { name: "กุมภาพันธ์", data: this.generateData("กุมภาพันธ์") },
      { name: "มีนาคม", data: this.generateData("มีนาคม") },
      { name: "เมษายน", data: this.generateData("เมษายน") },
      { name: "พฤษภาคม", data: this.generateData("พฤษภาคม") },
      { name: "มิถุนายน", data: this.generateData("มิถุนายน") },
      { name: "กรกฎาคม", data: this.generateData("กรกฎาคม") },
      { name: "สิงหาคม", data: this.generateData("สิงหาคม") },
      { name: "กันยายน", data: this.generateData("กันยายน") },
      { name: "ตุลาคม", data: this.generateData("ตุลาคม") },
      { name: "พฤศจิกายน", data: this.generateData("พฤศจิกายน") },
      { name: "ธันวาคม", data: this.generateData("ธันวาคม") }
    ];
  }
  setDateinMonth(strMonth: string, day: number) {
    let series = this.chartDictionary.get(strMonth)!;
    let index = day - 1;
    series[index] = series[index] + 1;
    this.chartDictionary.set(strMonth, series);
  }
  clearDic() {
    this.chartDictionary.set('มกราคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('กุมภาพันธ์', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('มีนาคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('เมษายน', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('พฤษภาคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('มิถุนายน', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('กรกฎาคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('สิงหาคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('กันยายน', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('ตุลาคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('พฤศจิกายน', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.chartDictionary.set('ธันวาคม', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  }
  public generateData(strMonth: string) {
    var i = 0;
    var series = [];
    var datas = this.chartDictionary.get(strMonth);
    while (i < 31) {
      series.push({
        x: (i + 1).toString(),
        y: datas![i],
      });
      i++;
    }
    return series;
  }
  print() {
    window.print();
  }
}
