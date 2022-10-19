import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SigninErrorDialogComponent } from '../signin-error-dialog/signin-error-dialog.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  signinForm: any = this.formBuilder.group({
    username: '',
    password: ''
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }
  onSubmit(): void {
    const username = this.signinForm.value['username'];
    const password = this.signinForm.value['password'];
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        //this.reloadPage();
        window.location.href = "/";
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.openDialog();
        console.log(this.isLoggedIn);
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
  openDialog() {
    this.dialog.open(SigninErrorDialogComponent, {
      width: '348px',
      data: this.errorMessage,
    });
  }
}


