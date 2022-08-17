import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.css']
})
export class UserNewDialogComponent implements OnInit {

  username = "";
  lastname = "";
  firstname = "";
  phone = "";
  email = "";
  password = "";

  constructor(public dialogRef: MatDialogRef<UserNewDialogComponent>,
    private service:UserService) { }

  ngOnInit(): void {
  }

  onSave(){
    this.service.createNewUser(
      this.username,
      this.firstname,
      this.lastname,
      this.phone,
      this.email,
      this.password
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
      error: (err) => { console.log(err); }
    });    
  }
}
