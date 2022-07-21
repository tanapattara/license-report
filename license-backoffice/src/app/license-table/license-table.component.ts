import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-license-table',
  templateUrl: './license-table.component.html',
  styleUrls: ['./license-table.component.css']
})

export class LicenseTableComponent implements OnInit {

  displayedColumns: string[] = ['LicNo', 'Province', 'Color', 'Brand', 'Location'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllLicense();
  }

  getAllLicense(){
    this.api.getLicenses().
      subscribe({
        next:(res) => {
          //console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err) => {
          console.log("Error while fetching licenses ");
        }
      });
  }

  applyFilter( event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

}
