import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
interface Role {
  id: number;
  name: string;
}
@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css'],
})
export class UserEditDialogComponent implements OnInit {
  angForm: FormGroup;
  id: number = 1;
  roleselected: number = 1;
  userRole: Role[] = [
    { id: 1, name: 'user' },
    //{ id: 2, name: 'moderator' },
    { id: 3, name: 'admin' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    private service: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.id = data.id;
    this.angForm = this.fb.group({
      username: [data.username, Validators.required],
      firstname: [data.firstname],
      lastname: [data.lastname],
      phone: [data.phone],
      email: [data.email, Validators.required],
      password: ['', Validators.required],
    });
    this.angForm.controls['username'].setValue(data.username);
    this.roleselected = data.role;
  }

  ngOnInit(): void {}
  onSubmit() {
    if (
      !this.angForm.get('email')?.valid ||
      !this.angForm.get('username')?.valid
    )
      return;

    let userData = new User();
    userData.id = this.id;
    userData.username = this.angForm.controls['username'].value;
    userData.email = this.angForm.controls['email'].value;
    userData.phone = this.angForm.controls['phone'].value;
    userData.firstname = this.angForm.controls['firstname'].value;
    userData.lastname = this.angForm.controls['lastname'].value;

    this.service.updateUser(userData).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
