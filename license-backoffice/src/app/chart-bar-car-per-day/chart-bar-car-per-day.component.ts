import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-chart-bar-car-per-day',
  templateUrl: './chart-bar-car-per-day.component.html',
  styleUrls: ['./chart-bar-car-per-day.component.css']
})
export class ChartBarCarPerDayComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถตลอดเดือน';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('monthSelection') monthSelection!: MatSelect;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<number, number>();
  chartDictionaryBike = new Map<number, number>();
  defaultValue = "ALL";
  month = ['ALL', 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  speedInput = "";

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true, maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        display: true,
        title: {
          display: true, text: 'วันที่', color: 'rgb(204, 61, 0)'
        }
      },
      y: {
        stacked: true,
        min: 0,
        display: true,
        title: {
          display: true, text: 'จำนวน', color: 'rgb(204, 61, 0)'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        align: 'start'
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
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    datasets: [
      {
        data: [], label: 'รถยนต์', borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
      },
      {
        data: [], label: 'รถจักรยานยนต์', borderColor: 'rgb(255, 172, 131)',
        backgroundColor: 'rgb(255, 172, 131)',
        borderRadius: Number.MAX_VALUE,
      },
    ]
  };

  constructor(private api: ApiService,) { }

  ngOnInit(): void {
    this.getAllLicense();
  }
  getAllLicense() {
    this.api.getLicenses().
      subscribe({
        next: (res) => {
          //console.log(res);
          this.dataSource = new MatTableDataSource(res);
          //this.dataSource.filter = this.filter;
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
              } else if (key == 'Month') {
                if (value as string == 'All')
                  isMatchFilter = true;
                else {
                  let strMonth = value as string;
                  let now_date = new Date();
                  let vmonth = now_date.getMonth()
                  switch (strMonth) {
                    case 'มกราคม': vmonth = 1; break;
                    case 'กุมภาพันธ์': vmonth = 2; break;
                    case 'มีนาคม': vmonth = 3; break;
                    case 'เมษายน': vmonth = 4; break;
                    case 'พฤษภาคม': vmonth = 5; break;
                    case 'มิถุนายน': vmonth = 6; break;
                    case 'กรกฎาคม': vmonth = 7; break;
                    case 'สิงหาคม': vmonth = 8; break;
                    case 'กันยายน': vmonth = 9; break;
                    case 'ตุลาคม': vmonth = 10; break;
                    case 'พฤศจิกายน': vmonth = 11; break;
                    case 'ธันวาคม': vmonth = 12; break;
                  }
                  let adate_key = 'aDate', bdate_key = 'bDate'
                  let RecValueA = new Date(record[adate_key as keyof License]);
                  let RecValueB = new Date(record[bdate_key as keyof License]);

                  isMatchFilter = (RecValueA.getMonth() == vmonth || RecValueB.getMonth() == vmonth);
                }
              }
              else {
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
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    for (let row of this.dataSource.filteredData) {
      let d: Date = new Date(row.aDate);
      let isBike: boolean = row.Type == '7' || row.Type == '8';

      let date = d.getDate();
      let value = isBike ? this.chartDictionaryBike.get(date)! + 1 : this.chartDictionaryCar.get(date)! + 1;

      if (isBike)
        this.chartDictionaryBike.set(date, value);
      else
        this.chartDictionaryCar.set(date, value);

    }
    for (let [key, value] of this.chartDictionaryCar) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }
    for (let [key, value] of this.chartDictionaryBike) {
      // this.barChartData.labels!.push(key);
      this.barChartData.datasets[1].data.push(value);
    }

    this.chart?.update();
  }
  clearDic() {
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
  applyFilter(ob: MatSelectChange) {
    this.filterDictionary.set("Month", ob.value);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
    this.displayData();
  }
  clearFilter() {
    this.monthSelection.options.first.select();
    this.dataSource.filter = "";
    this.displayData();
  }
  onChangeEvent(event: any, filtername: string) {
    var filtervalue = (event.target as HTMLInputElement).value == "" ? "All" : (event.target as HTMLInputElement).value;
    this.filterDictionary.set(filtername, filtervalue);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;
    this.displayData();
  }
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  print() {
    window.print();
  }
}
