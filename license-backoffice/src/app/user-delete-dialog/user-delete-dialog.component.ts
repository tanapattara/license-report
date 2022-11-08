import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-user-delete-dialog',
  templateUrl: './user-delete-dialog.component.html',
  styleUrls: ['./user-delete-dialog.component.css'],
})
export class UserDeleteDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.service.deleteUser(this.data.id).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
