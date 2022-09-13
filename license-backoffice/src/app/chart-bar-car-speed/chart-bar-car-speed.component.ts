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
  chartDictionaryCar = new Map<number, number>();
  chartDictionaryBike = new Map<number, number>();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'ความเร็ว km/hr',
          color: 'rgb(204, 61, 0)'
        }
      },
      y: {
        stacked: true,
        min: 0,
        title: {
          display: true,
          text: 'จำนวน',
          color: 'rgb(204, 61, 0)'
        }
      }
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
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130+'],
    datasets: [
      {
        data: [], label: 'รถยนต์',
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
      },
      {
        data: [], label: 'รถจักรยานยนต์',
        borderColor: 'rgb(255, 172, 131)',
        backgroundColor: 'rgb(255, 172, 131)',
        borderRadius: Number.MAX_VALUE,
      },
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

                if (sDate.getTime() == eDate.getTime()) {
                  isMatchFilter = (RecValueA.getFullYear() == sDate.getFullYear() && RecValueA.getMonth() == sDate.getMonth() && RecValueA.getDate() == sDate.getDate()) ||
                    (RecValueB.getFullYear() == sDate.getFullYear() && RecValueB.getMonth() == sDate.getMonth() && RecValueB.getDate() == sDate.getDate());
                }
                else {
                  isMatchFilter = (RecValueA >= sDate && RecValueA <= eDate) || (RecValueB >= sDate && RecValueB <= eDate);
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

      if (speed < 10) { value = isBike ? this.chartDictionaryBike.get(0)! + 1 : this.chartDictionaryCar.get(0)! + 1; k = 0; }
      else if (speed < 20) { isBike ? this.chartDictionaryBike.get(10)! + 1 : value = this.chartDictionaryCar.get(10)! + 1; k = 10; }
      else if (speed < 30) { isBike ? this.chartDictionaryBike.get(20)! + 1 : value = this.chartDictionaryCar.get(20)! + 1; k = 20; }
      else if (speed < 40) { isBike ? this.chartDictionaryBike.get(30)! + 1 : value = this.chartDictionaryCar.get(30)! + 1; k = 30; }
      else if (speed < 50) { isBike ? this.chartDictionaryBike.get(40)! + 1 : value = this.chartDictionaryCar.get(40)! + 1; k = 40; }
      else if (speed < 60) { isBike ? this.chartDictionaryBike.get(50)! + 1 : value = this.chartDictionaryCar.get(50)! + 1; k = 50; }
      else if (speed < 70) { isBike ? this.chartDictionaryBike.get(60)! + 1 : value = this.chartDictionaryCar.get(60)! + 1; k = 60; }
      else if (speed < 80) { isBike ? this.chartDictionaryBike.get(70)! + 1 : value = this.chartDictionaryCar.get(70)! + 1; k = 70; }
      else if (speed < 90) { isBike ? this.chartDictionaryBike.get(80)! + 1 : value = this.chartDictionaryCar.get(80)! + 1; k = 80; }
      else if (speed < 100) { isBike ? this.chartDictionaryBike.get(90)! + 1 : value = this.chartDictionaryCar.get(90)! + 1; k = 90; }
      else if (speed < 110) { isBike ? this.chartDictionaryBike.get(100)! + 1 : value = this.chartDictionaryCar.get(100)! + 1; k = 100; }
      else if (speed < 120) { isBike ? this.chartDictionaryBike.get(110)! + 1 : value = this.chartDictionaryCar.get(110)! + 1; k = 110; }
      else if (speed < 130) { isBike ? this.chartDictionaryBike.get(120)! + 1 : value = this.chartDictionaryCar.get(120)! + 1; k = 120; }
      else if (speed >= 130) { isBike ? this.chartDictionaryBike.get(130)! + 1 : value = this.chartDictionaryCar.get(130)! + 1; k = 130; }

      if (isBike)
        this.chartDictionaryBike.set(k, value);
      else
        this.chartDictionaryCar.set(k, value);
    }
    for (let [key, value] of this.chartDictionaryCar) {
      let ktext = key.toString();
      if (key == 130)
        ktext = '130+';
      this.barChartData.labels!.push(ktext);

      this.barChartData.datasets[0].data.push(value);
    } for (let [key, value] of this.chartDictionaryBike) {
      // this.barChartData.labels!.push(key);
      this.barChartData.datasets[1].data.push(value);
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
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }
  print() {
    window.print();
  }
}
