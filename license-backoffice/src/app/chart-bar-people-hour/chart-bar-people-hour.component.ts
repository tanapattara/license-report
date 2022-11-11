import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ChartConfiguration, ChartType, ChartData, ChartEvent } from 'chart.js';
import { ChannelFilter } from '../model/Filter';
import { ApiService } from '../services/api.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatTableDataSource } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-bar-people-hour',
  templateUrl: './chart-bar-people-hour.component.html',
  styleUrls: ['./chart-bar-people-hour.component.css'],
})
export class ChartBarPeopleHourComponent implements OnInit {
  datepickerInput1 = '';
  datepickerInput2 = '';
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  incount = 0;
  outcount = 0;
  defaultChannel = 1;
  channel = [1, 2, 3, 4, 5, 6, 7, 8];
  dataSource!: MatTableDataSource<any>;

  @ViewChild('channelSelection') channelSelection!: MatSelect;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartDictionaryIn = new Map<string, number>();
  chartDictionaryOut = new Map<string, number>();

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'ชั่วโมง',
          color: 'rgb(204, 61, 0)',
        },
      },
      y: {
        stacked: true,
        min: 0,
        title: {
          display: true,
          text: 'จำนวน',
          color: 'rgb(204, 61, 0)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        align: 'start',
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
        },
        formatter: (value, ctx) => {
          return value.toLocaleString();
        },
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'เข้า',
        borderColor: 'rgb(204, 61, 0)',
        backgroundColor: 'rgb(204, 61, 0)',
        borderRadius: Number.MAX_VALUE,
        datalabels: {
          align: 'center',
          anchor: 'center',
        },
        borderSkipped: 'middle',
      },
      {
        data: [],
        label: 'ออก',
        borderColor: 'rgb(255, 172, 131)',
        backgroundColor: 'rgb(255, 172, 131)',
        borderRadius: Number.MAX_VALUE,
        datalabels: {
          align: 'center',
          anchor: 'center',
        },
      },
    ],
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
  search() {
    let filter = {} as ChannelFilter;
    filter.startDate = this.range.value.start as Date;
    filter.endDate = this.range.value.end as Date;
    filter.channel = this.channelSelection.value;

    this.api.getPeopleWithFilter(filter).subscribe({
      next: (res) => {
        //console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.displayData();
      },
      error: (err) => {
        console.log('Error while fetching people data');
      },
    });
  }
  displayData() {
    this.clearDic();
    if (this.dataSource.filteredData.length) {
      for (let row of this.dataSource.filteredData) {
        let d: Date = new Date(row.starttime);
        this.incount += row.entercount;
        this.outcount += row.exitcount;
        switch (d.getHours()) {
          case 0: {
            this.chartDictionaryIn.set('00', row.entercount);
            this.chartDictionaryOut.set('00', row.exitcount);
            break;
          }
          case 1: {
            this.chartDictionaryIn.set('01', row.entercount);
            this.chartDictionaryOut.set('01', row.exitcount);
            break;
          }
          case 2: {
            this.chartDictionaryIn.set('02', row.entercount);
            this.chartDictionaryOut.set('02', row.exitcount);
            break;
          }
          case 3: {
            this.chartDictionaryIn.set('03', row.entercount);
            this.chartDictionaryOut.set('03', row.exitcount);
            break;
          }
          case 4: {
            this.chartDictionaryIn.set('04', row.entercount);
            this.chartDictionaryOut.set('04', row.exitcount);
            break;
          }
          case 5: {
            this.chartDictionaryIn.set('05', row.entercount);
            this.chartDictionaryOut.set('05', row.exitcount);
            break;
          }
          case 6: {
            this.chartDictionaryIn.set('06', row.entercount);
            this.chartDictionaryOut.set('06', row.exitcount);
            break;
          }
          case 7: {
            this.chartDictionaryIn.set('07', row.entercount);
            this.chartDictionaryOut.set('07', row.exitcount);
            break;
          }
          case 8: {
            this.chartDictionaryIn.set('08', row.entercount);
            this.chartDictionaryOut.set('08', row.exitcount);
            break;
          }
          case 9: {
            this.chartDictionaryIn.set('09', row.entercount);
            this.chartDictionaryOut.set('09', row.exitcount);
            break;
          }
          case 10: {
            this.chartDictionaryIn.set('10', row.entercount);
            this.chartDictionaryOut.set('10', row.exitcount);
            break;
          }
          case 11: {
            this.chartDictionaryIn.set('11', row.entercount);
            this.chartDictionaryOut.set('11', row.exitcount);
            break;
          }
          case 12: {
            this.chartDictionaryIn.set('12', row.entercount);
            this.chartDictionaryOut.set('12', row.exitcount);
            break;
          }
          case 13: {
            this.chartDictionaryIn.set('13', row.entercount);
            this.chartDictionaryOut.set('13', row.exitcount);
            break;
          }
          case 14: {
            this.chartDictionaryIn.set('14', row.entercount);
            this.chartDictionaryOut.set('14', row.exitcount);
            break;
          }
          case 15: {
            this.chartDictionaryIn.set('15', row.entercount);
            this.chartDictionaryOut.set('15', row.exitcount);
            break;
          }
          case 16: {
            this.chartDictionaryIn.set('16', row.entercount);
            this.chartDictionaryOut.set('16', row.exitcount);
            break;
          }
          case 17: {
            this.chartDictionaryIn.set('17', row.entercount);
            this.chartDictionaryOut.set('17', row.exitcount);
            break;
          }
          case 18: {
            this.chartDictionaryIn.set('18', row.entercount);
            this.chartDictionaryOut.set('18', row.exitcount);
            break;
          }
          case 19: {
            this.chartDictionaryIn.set('19', row.entercount);
            this.chartDictionaryOut.set('19', row.exitcount);
            break;
          }
          case 20: {
            this.chartDictionaryIn.set('20', row.entercount);
            this.chartDictionaryOut.set('20', row.exitcount);
            break;
          }
          case 21: {
            this.chartDictionaryIn.set('21', row.entercount);
            this.chartDictionaryOut.set('21', row.exitcount);
            break;
          }
          case 22: {
            this.chartDictionaryIn.set('22', row.entercount);
            this.chartDictionaryOut.set('22', row.exitcount);
            break;
          }
          case 23: {
            this.chartDictionaryIn.set('23', row.entercount);
            this.chartDictionaryOut.set('23', row.exitcount);
            break;
          }
        }
      }
    }
    for (let [key, value] of this.chartDictionaryIn) {
      this.barChartData.labels!.push(key);
      this.barChartData.datasets[0].data.push(value);
    }
    for (let [key, value] of this.chartDictionaryOut) {
      this.barChartData.datasets[1].data.push(value);
    }
    this.chart!.update();
  }

  clearFilter() {
    this.datepickerInput1 = '';
    this.datepickerInput2 = '';
    this.channelSelection.options.first.select();
    this.clearDic();
    this.chart!.update();
  }

  clearDic() {
    this.incount = 0;
    this.outcount = 0;

    this.barChartData.datasets[0].data = [];
    this.barChartData.datasets[1].data = [];
    this.barChartData.labels = [];

    this.chartDictionaryIn.set('00', 0);
    this.chartDictionaryIn.set('01', 0);
    this.chartDictionaryIn.set('02', 0);
    this.chartDictionaryIn.set('03', 0);
    this.chartDictionaryIn.set('04', 0);
    this.chartDictionaryIn.set('05', 0);
    this.chartDictionaryIn.set('06', 0);
    this.chartDictionaryIn.set('07', 0);
    this.chartDictionaryIn.set('08', 0);
    this.chartDictionaryIn.set('09', 0);
    this.chartDictionaryIn.set('10', 0);
    this.chartDictionaryIn.set('11', 0);
    this.chartDictionaryIn.set('12', 0);
    this.chartDictionaryIn.set('13', 0);
    this.chartDictionaryIn.set('14', 0);
    this.chartDictionaryIn.set('15', 0);
    this.chartDictionaryIn.set('16', 0);
    this.chartDictionaryIn.set('17', 0);
    this.chartDictionaryIn.set('18', 0);
    this.chartDictionaryIn.set('19', 0);
    this.chartDictionaryIn.set('20', 0);
    this.chartDictionaryIn.set('21', 0);
    this.chartDictionaryIn.set('22', 0);
    this.chartDictionaryIn.set('23', 0);

    this.chartDictionaryOut.set('00', 0);
    this.chartDictionaryOut.set('01', 0);
    this.chartDictionaryOut.set('02', 0);
    this.chartDictionaryOut.set('03', 0);
    this.chartDictionaryOut.set('04', 0);
    this.chartDictionaryOut.set('05', 0);
    this.chartDictionaryOut.set('06', 0);
    this.chartDictionaryOut.set('07', 0);
    this.chartDictionaryOut.set('08', 0);
    this.chartDictionaryOut.set('09', 0);
    this.chartDictionaryOut.set('10', 0);
    this.chartDictionaryOut.set('11', 0);
    this.chartDictionaryOut.set('12', 0);
    this.chartDictionaryOut.set('13', 0);
    this.chartDictionaryOut.set('14', 0);
    this.chartDictionaryOut.set('15', 0);
    this.chartDictionaryOut.set('16', 0);
    this.chartDictionaryOut.set('17', 0);
    this.chartDictionaryOut.set('18', 0);
    this.chartDictionaryOut.set('19', 0);
    this.chartDictionaryOut.set('20', 0);
    this.chartDictionaryOut.set('21', 0);
    this.chartDictionaryOut.set('22', 0);
    this.chartDictionaryOut.set('23', 0);
  }
  print() {
    window.print();
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }
}
