import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signin-error-dialog',
  templateUrl: './signin-error-dialog.component.html',
  styleUrls: ['./signin-error-dialog.component.css']
})
export class SigninErrorDialogComponent implements OnInit {

  errorMessage: string = "";

  constructor(public dialogRef: MatDialogRef<SigninErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { 
      this.errorMessage = data;
    }

  ngOnInit(): void {

  }

}
