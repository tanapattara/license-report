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
  selector: 'app-chart-bar-car-per-month',
  templateUrl: './chart-bar-car-per-month.component.html',
  styleUrls: ['./chart-bar-car-per-month.component.css']
})
export class ChartBarCarPerMonthComponent implements OnInit {
  title = 'แผนภูมิจำนวนรถตลอดปี';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  dataSource!: MatTableDataSource<any>;
  chartdataset: string[] = [];
  datepickerInput1 = "";
  datepickerInput2 = "";
  speedInput = "";

  filterDictionary = new Map<string, any>();
  chartDictionaryCar = new Map<string, number>();
  chartDictionaryBike = new Map<string, number>();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true, title: {
          display: true,
          text: 'เดือน'
        }
      },
      y: {
        stacked: true,
        min: 0,
        title: {
          display: true,
          text: 'จำนวน'
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
        align: 'center'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
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

      let month = "";
      let value = 0;
      switch (d.getMonth()) {
        case 1: { month = "มกราคม"; value = isBike ? this.chartDictionaryBike.get("มกราคม")! + 1 : this.chartDictionaryCar.get("มกราคม")! + 1; break; }
        case 2: { month = "กุมภาพันธ์"; value = isBike ? this.chartDictionaryBike.get("กุมภาพันธ์")! + 1 : this.chartDictionaryCar.get("กุมภาพันธ์")! + 1; break; }
        case 3: { month = "มีนาคม"; value = isBike ? this.chartDictionaryBike.get("มีนาคม")! + 1 : this.chartDictionaryCar.get("มีนาคม")! + 1; break; }
        case 4: { month = "เมษายน"; value = isBike ? this.chartDictionaryBike.get("เมษายน")! + 1 : this.chartDictionaryCar.get("เมษายน")! + 1; break; }
        case 5: { month = "พฤษภาคม"; value = isBike ? this.chartDictionaryBike.get("พฤษภาคม")! + 1 : this.chartDictionaryCar.get("พฤษภาคม")! + 1; break; }
        case 6: { month = "มิถุนายน"; value = isBike ? this.chartDictionaryBike.get("มิถุนายน")! + 1 : this.chartDictionaryCar.get("มิถุนายน")! + 1; break; }
        case 7: { month = "กรกฎาคม"; value = isBike ? this.chartDictionaryBike.get("กรกฎาคม")! + 1 : this.chartDictionaryCar.get("กรกฎาคม")! + 1; break; }
        case 8: { month = "สิงหาคม"; value = isBike ? this.chartDictionaryBike.get("สิงหาคม")! + 1 : this.chartDictionaryCar.get("สิงหาคม")! + 1; break; }
        case 9: { month = "กันยายน"; value = isBike ? this.chartDictionaryBike.get("กันยายน")! + 1 : this.chartDictionaryCar.get("กันยายน")! + 1; break; }
        case 10: { month = "ตุลาคม"; value = isBike ? this.chartDictionaryBike.get("ตุลาคม")! + 1 : this.chartDictionaryCar.get("ตุลาคม")! + 1; break; }
        case 11: { month = "พฤศจิกายน"; value = isBike ? this.chartDictionaryBike.get("พฤศจิกายน")! + 1 : this.chartDictionaryCar.get("พฤศจิกายน")! + 1; break; }
        case 12: { month = "ธันวาคม"; value = isBike ? this.chartDictionaryBike.get("ธันวาคม")! + 1 : this.chartDictionaryCar.get("ธันวาคม")! + 1; break; }
      }

      if (month == "")
        continue;

      if (isBike)
        this.chartDictionaryBike.set(month, value);
      else
        this.chartDictionaryCar.set(month, value);

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
    this.chartDictionaryCar.set("มกราคม", 0);
    this.chartDictionaryCar.set("กุมภาพันธ์", 0);
    this.chartDictionaryCar.set("มีนาคม", 0);
    this.chartDictionaryCar.set("เมษายน", 0);
    this.chartDictionaryCar.set("พฤษภาคม", 0);
    this.chartDictionaryCar.set("มิถุนายน", 0);
    this.chartDictionaryCar.set("กรกฎาคม", 0);
    this.chartDictionaryCar.set("สิงหาคม", 0);
    this.chartDictionaryCar.set("กันยายน", 0);
    this.chartDictionaryCar.set("ตุลาคม", 0);
    this.chartDictionaryCar.set("พฤศจิกายน", 0);
    this.chartDictionaryCar.set("ธันวาคม", 0);

    this.chartDictionaryBike.set("มกราคม", 0);
    this.chartDictionaryBike.set("กุมภาพันธ์", 0);
    this.chartDictionaryBike.set("มีนาคม", 0);
    this.chartDictionaryBike.set("เมษายน", 0);
    this.chartDictionaryBike.set("พฤษภาคม", 0);
    this.chartDictionaryBike.set("มิถุนายน", 0);
    this.chartDictionaryBike.set("กรกฎาคม", 0);
    this.chartDictionaryBike.set("สิงหาคม", 0);
    this.chartDictionaryBike.set("กันยายน", 0);
    this.chartDictionaryBike.set("ตุลาคม", 0);
    this.chartDictionaryBike.set("พฤศจิกายน", 0);
    this.chartDictionaryBike.set("ธันวาคม", 0);
  }
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
