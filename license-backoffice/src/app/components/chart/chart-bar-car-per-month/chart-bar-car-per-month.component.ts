import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../../services/api.service';
import { License } from '../../../model/license';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FilterlicenseService } from '../../../services/filterlicense.service';

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
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
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
      let month = "";
      let value = 0;
      switch (d.getMonth()) {
        case 1: { month = "มกราคม"; value = this.chartDictionary.get("มกราคม")! + 1; break; }
        case 2: { month = "กุมภาพันธ์"; value = this.chartDictionary.get("กุมภาพันธ์")! + 1; break; }
        case 3: { month = "มีนาคม"; value = this.chartDictionary.get("มีนาคม")! + 1; break; }
        case 4: { month = "เมษายน"; value = this.chartDictionary.get("เมษายน")! + 1; break; }
        case 5: { month = "พฤษภาคม"; value = this.chartDictionary.get("พฤษภาคม")! + 1; break; }
        case 6: { month = "มิถุนายน"; value = this.chartDictionary.get("มิถุนายน")! + 1; break; }

        case 7: { month = "กรกฎาคม"; value = this.chartDictionary.get("กรกฎาคม")! + 1; break; }
        case 8: { month = "สิงหาคม"; value = this.chartDictionary.get("สิงหาคม")! + 1; break; }
        case 9: { month = "กันยายน"; value = this.chartDictionary.get("กันยายน")! + 1; break; }
        case 10: { month = "ตุลาคม"; value = this.chartDictionary.get("ตุลาคม")! + 1; break; }
        case 11: { month = "พฤศจิกายน"; value = this.chartDictionary.get("พฤศจิกายน")! + 1; break; }
        case 12: { month = "ธันวาคม"; value = this.chartDictionary.get("ธันวาคม")! + 1; break; }
      }

      if (month == "")
        continue;

      this.chartDictionary.set(month, value);
    }
    for (let [key, value] of this.chartDictionary) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }

    this.chart?.update();
  }
  clearDic() {
    this.chartDictionary.set("มกราคม", 0);
    this.chartDictionary.set("กุมภาพันธ์", 0);
    this.chartDictionary.set("มีนาคม", 0);
    this.chartDictionary.set("เมษายน", 0);
    this.chartDictionary.set("พฤษภาคม", 0);
    this.chartDictionary.set("มิถุนายน", 0);

    this.chartDictionary.set("กรกฎาคม", 0);
    this.chartDictionary.set("สิงหาคม", 0);
    this.chartDictionary.set("กันยายน", 0);
    this.chartDictionary.set("ตุลาคม", 0);
    this.chartDictionary.set("พฤศจิกายน", 0);
    this.chartDictionary.set("ธันวาคม", 0);
  }
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
