import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../services/api.service';
import { License } from '../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FilterlicenseService } from '../services/filterlicense.service';

@Component({
  selector: 'app-chart-bar-car-per-hour',
  templateUrl: './chart-bar-car-per-hour.component.html',
  styleUrls: ['./chart-bar-car-per-hour.component.css']
})
export class ChartBarCarPerHourComponent implements OnInit {
  title = 'ng2-charts-demo';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  datepickerInput1 = "";
  datepickerInput2 = "";
  speedInput = "";

  filterDictionary = new Map<string, any>();
  chartDictionary = new Map<string, number>();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
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
      { data: [], label: 'จำนวนรถ' },
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
    this.barChartData.labels = [];

    for (let row of this.dataSource.filteredData) {
      let d: Date = new Date(row.aDate);
      let hour = "";
      let value = 0;
      switch (d.getHours()) {
        case 0: { hour = "00"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 1: { hour = "01"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 2: { hour = "02"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 3: { hour = "03"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 4: { hour = "04"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 5: { hour = "05"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 6: { hour = "06"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 7: { hour = "07"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 8: { hour = "08"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 9: { hour = "09"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 10: { hour = "10"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 11: { hour = "11"; value = this.chartDictionary.get(hour)! + 1; break; }

        case 12: { hour = "12"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 13: { hour = "13"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 14: { hour = "14"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 15: { hour = "15"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 16: { hour = "16"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 17: { hour = "17"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 18: { hour = "18"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 19: { hour = "19"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 20: { hour = "20"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 21: { hour = "21"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 22: { hour = "22"; value = this.chartDictionary.get(hour)! + 1; break; }
        case 23: { hour = "23"; value = this.chartDictionary.get(hour)! + 1; break; }
      }

      if (hour == "")
        continue;

      this.chartDictionary.set(hour, value);
    }
    for (let [key, value] of this.chartDictionary) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }

    this.chart?.update();
  }
  clearDic() {
    this.chartDictionary.set("00", 0);
    this.chartDictionary.set("01", 0);
    this.chartDictionary.set("02", 0);
    this.chartDictionary.set("03", 0);
    this.chartDictionary.set("04", 0);
    this.chartDictionary.set("05", 0);
    this.chartDictionary.set("06", 0);
    this.chartDictionary.set("07", 0);
    this.chartDictionary.set("08", 0);
    this.chartDictionary.set("09", 0);
    this.chartDictionary.set("10", 0);
    this.chartDictionary.set("11", 0);

    this.chartDictionary.set("12", 0);
    this.chartDictionary.set("13", 0);
    this.chartDictionary.set("14", 0);
    this.chartDictionary.set("15", 0);
    this.chartDictionary.set("16", 0);
    this.chartDictionary.set("17", 0);
    this.chartDictionary.set("18", 0);
    this.chartDictionary.set("19", 0);
    this.chartDictionary.set("20", 0);
    this.chartDictionary.set("21", 0);
    this.chartDictionary.set("22", 0);
    this.chartDictionary.set("23", 0);
  }
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
