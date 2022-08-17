import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-new-dialog',
  templateUrl: './user-new-dialog.component.html',
  styleUrls: ['./user-new-dialog.component.css']
})
export class UserNewDialogComponent implements OnInit {
  angForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserNewDialogComponent>,
    private service: UserService,
    private fb: FormBuilder) {

    this.angForm = this.fb.group({
      username: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      phone: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.angForm.get('email')?.valid ||
      !this.angForm.get('username')?.valid ||
      !this.angForm.get('password')?.valid)
      return

    this.service.createNewUser(this.angForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
      },
      error: (err) => { console.log(err); }
    });
  }
}
