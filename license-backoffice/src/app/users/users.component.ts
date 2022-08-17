import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
@Component({
selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'username', 'firstname','lastname','phone','email'];
  dataSource!: MatTableDataSource<any>;

  resultsLength = 0;

  constructor(private api: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.
          sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      },
      error: (err) => { console.log(err); }
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UserNewDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(() => {
      this.getUser();
    });
  }
}
