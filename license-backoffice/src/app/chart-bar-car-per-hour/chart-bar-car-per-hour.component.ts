import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormGroup, FormControl } from '@angular/forms';
import { FilterlicenseService } from '../services/filterlicense.service';

@Component({
  selector: 'app-chart-bar-car-per-hour',
  templateUrl: './chart-bar-car-per-hour.component.html',
  styleUrls: ['./chart-bar-car-per-hour.component.css']
})
export class ChartBarCarPerHourComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถต่อวัน';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  datepickerInput1 = "";
  datepickerInput2 = "";
  speedInput = "";
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<string, number>();
  chartDictionaryBike = new Map<string, number>();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true, text: 'ชั่วโมง', color: 'rgb(204, 61, 0)'
        }
      },
      y: {
        stacked: true,
        min: 0,
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
    labels: [],
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

  filter: string = "";
  notifierSubscription: Subscription = this.filterService.event.subscribe(notified => {
    this.filter = this.filterService.getFilter();
    this.dataSource.filter = this.filter;
    this.displayData();
  });
  constructor(private api: ApiService, private filterService: FilterlicenseService) { }

  ngOnInit(): void {
    this.getAllLicense();
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
    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    for (let row of this.dataSource.filteredData) {
      let d: Date = new Date(row.aDate);
      let isBike: boolean = row.Type == '7' || row.Type == '8';

      let hour = "";
      let value = 0;
      switch (d.getHours()) {
        case 0: { hour = "00"; value = value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 1: { hour = "01"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 2: { hour = "02"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 3: { hour = "03"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 4: { hour = "04"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 5: { hour = "05"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 6: { hour = "06"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 7: { hour = "07"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 8: { hour = "08"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 9: { hour = "09"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 10: { hour = "10"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 11: { hour = "11"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }

        case 12: { hour = "12"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 13: { hour = "13"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 14: { hour = "14"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 15: { hour = "15"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 16: { hour = "16"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 17: { hour = "17"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 18: { hour = "18"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 19: { hour = "19"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 20: { hour = "20"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 21: { hour = "21"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 22: { hour = "22"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
        case 23: { hour = "23"; value = isBike ? this.chartDictionaryBike.get(hour)! + 1 : this.chartDictionaryCar.get(hour)! + 1; break; }
      }

      if (hour == "")
        continue;

      if (isBike)
        this.chartDictionaryBike.set(hour, value);
      else
        this.chartDictionaryCar.set(hour, value);
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
  DatePickervalueChanged() {
    var startdate = this.range.value.start as Date
    var enddate = this.range.value.end as Date
    this.filterDictionary.set("date", [startdate, enddate]);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.filter = jsonString;
    this.dataSource.filter = this.filter;
    this.displayData();
  }
  clearDic() {
    this.chartDictionaryCar.set("00", 0);
    this.chartDictionaryCar.set("01", 0);
    this.chartDictionaryCar.set("02", 0);
    this.chartDictionaryCar.set("03", 0);
    this.chartDictionaryCar.set("04", 0);
    this.chartDictionaryCar.set("05", 0);
    this.chartDictionaryCar.set("06", 0);
    this.chartDictionaryCar.set("07", 0);
    this.chartDictionaryCar.set("08", 0);
    this.chartDictionaryCar.set("09", 0);
    this.chartDictionaryCar.set("10", 0);
    this.chartDictionaryCar.set("11", 0);
    this.chartDictionaryCar.set("12", 0);
    this.chartDictionaryCar.set("13", 0);
    this.chartDictionaryCar.set("14", 0);
    this.chartDictionaryCar.set("15", 0);
    this.chartDictionaryCar.set("16", 0);
    this.chartDictionaryCar.set("17", 0);
    this.chartDictionaryCar.set("18", 0);
    this.chartDictionaryCar.set("19", 0);
    this.chartDictionaryCar.set("20", 0);
    this.chartDictionaryCar.set("21", 0);
    this.chartDictionaryCar.set("22", 0);
    this.chartDictionaryCar.set("23", 0);

    this.chartDictionaryBike.set("00", 0);
    this.chartDictionaryBike.set("01", 0);
    this.chartDictionaryBike.set("02", 0);
    this.chartDictionaryBike.set("03", 0);
    this.chartDictionaryBike.set("04", 0);
    this.chartDictionaryBike.set("05", 0);
    this.chartDictionaryBike.set("06", 0);
    this.chartDictionaryBike.set("07", 0);
    this.chartDictionaryBike.set("08", 0);
    this.chartDictionaryBike.set("09", 0);
    this.chartDictionaryBike.set("10", 0);
    this.chartDictionaryBike.set("11", 0);
    this.chartDictionaryBike.set("12", 0);
    this.chartDictionaryBike.set("13", 0);
    this.chartDictionaryBike.set("14", 0);
    this.chartDictionaryBike.set("15", 0);
    this.chartDictionaryBike.set("16", 0);
    this.chartDictionaryBike.set("17", 0);
    this.chartDictionaryBike.set("18", 0);
    this.chartDictionaryBike.set("19", 0);
    this.chartDictionaryBike.set("20", 0);
    this.chartDictionaryBike.set("21", 0);
    this.chartDictionaryBike.set("22", 0);
    this.chartDictionaryBike.set("23", 0);
  }
  clearFilter() {
    this.datepickerInput1 = "";
    this.datepickerInput2 = "";
    this.filter = "";
    this.dataSource.filter = this.filter;
    this.displayData();
  }
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
