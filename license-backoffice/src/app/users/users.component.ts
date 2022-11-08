import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserNewDialogComponent } from '../user-new-dialog/user-new-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { User } from '../model/user';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'username',
    'firstname',
    'lastname',
    'phone',
    'email',
    'role',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  resultsLength = 0;

  constructor(private api: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openDialog(): void {
    this.dialog
      .open(UserNewDialogComponent, {
        width: '348px',
      })
      .afterClosed()
      .subscribe(() => {
        this.getUser();
      });
  }
  cellClick(user: User) {
    this.dialog
      .open(UserEditDialogComponent, {
        width: '348px',
        data: user,
      })
      .afterClosed()
      .subscribe(() => {
        this.getUser();
      });
  }
  delUser(user: User) {
    this.dialog
      .open(UserDeleteDialogComponent, { width: '348px', data: user })
      .afterClosed()
      .subscribe(() => {
        this.getUser();
      });
  }
}
