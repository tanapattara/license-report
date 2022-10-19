import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public storageservice: StorageService) { }
  canActivate(): boolean {
    if (!this.storageservice.isLoggedIn()) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
