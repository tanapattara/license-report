import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { License } from '../model/license';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chart-bar-car-speed',
  templateUrl: './chart-bar-car-speed.component.html',
  styleUrls: ['./chart-bar-car-speed.component.css']
})
export class ChartBarCarSpeedComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถต่อช่วงความเร็ว';

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
  chartDictionary = new Map<number, number>();

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
        display: true,
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
    labels: ['40', '50', '60', '70', '80', '90', '100', '110', '120+'],
    datasets: [
      { data: [] },
    ]
  };

  filter: string = "";

  constructor(private api: ApiService) { }

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
    //'40', '50', '60', '70', '80', '90', '100', '110', '120+'
    this.chartDictionary.set(40, 0);
    this.chartDictionary.set(50, 0);
    this.chartDictionary.set(60, 0);
    this.chartDictionary.set(70, 0);
    this.chartDictionary.set(80, 0);
    this.chartDictionary.set(90, 0);
    this.chartDictionary.set(100, 0);
    this.chartDictionary.set(110, 0);
    this.chartDictionary.set(120, 0);
  }
  displayData() {
    this.clearDic();
    this.barChartData.datasets[0].data = [];
    this.barChartData.labels = [];

    for (let row of this.dataSource.filteredData) {
      let speed: Number = parseInt(row.Speed);
      let k = 40;
      let value = 0;
      if (speed < 50) { value = this.chartDictionary.get(40)! + 1; k = 40; }
      else if (speed < 60) { value = this.chartDictionary.get(50)! + 1; k = 50; }
      else if (speed < 70) { value = this.chartDictionary.get(60)! + 1; k = 60; }
      else if (speed < 80) { value = this.chartDictionary.get(70)! + 1; k = 70; }
      else if (speed < 90) { value = this.chartDictionary.get(80)! + 1; k = 80; }
      else if (speed < 100) { value = this.chartDictionary.get(90)! + 1; k = 90; }
      else if (speed < 110) { value = this.chartDictionary.get(100)! + 1; k = 100; }
      else if (speed < 120) { value = this.chartDictionary.get(110)! + 1; k = 110; }
      else if (speed >= 120) { value = this.chartDictionary.get(120)! + 1; k = 120; }

      this.chartDictionary.set(k, value);
    }
    for (let [key, value] of this.chartDictionary) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }

    this.chart?.update();
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
